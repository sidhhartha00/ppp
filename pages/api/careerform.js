import { Writable } from 'stream';
import formidable, { errors as formidableErrors } from 'formidable';
import Email from '@/utils/email';
import { ValidationError } from 'yup';
import { careerSchema } from '@/schemas/career';
const fs = require("fs");

/**
 * Config
 *
 * https://nextjs.org/docs/api-routes/request-helpers
 * https://github.com/node-formidable/formidable#options
 */
export const config = {
    api: {
        bodyParser: false
    }
};

const formidableConfig = {
    keepExtensions: true,
    // maxFileSize: 4 * 1024 * 1024
};

/**
 * Helpers
 *
 * https://github.com/node-formidable/formidable
 */
function formidablePromise(req, opts) {
    return new Promise((resolve, reject) => {
        const form = formidable(opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }

            return resolve({ fields, files });
        });
    });
}

const fileConsumer = (file, filesData) => {
    const chunks = [];

    const writable = new Writable({
        write (chunk, _enc, next) {
            chunks.push(chunk);

            next();
        },
        final(cb) {
            const buffer = Buffer.concat(chunks);
            filesData[file.originalFilename] = buffer;
            cb();
        },
    })
    return writable;
};

/**
 * Handler
 *
 * https://nextjs.org/docs/api-routes/introduction
 */
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }

    try {
        const filesData = {};

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            /* Consumes this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: (file) => fileConsumer(file, filesData)
        });

        // console.log(filesData);

        /* Destructure fields */
        const { recaptchaToken, labels, ...formFields } = fields;

        /* Validation */
        await careerSchema.validate({ ...formFields, ...files }, { abortEarly: false });
        // await careerSchema.validate({ ...fields, ...files }, { abortEarly: false });

        /* Attachments */
        const attachments = [];

        Object.entries(filesData).forEach(([key, value]) => {
            attachments.push({ content: value.toString('base64'), filename: key });
        });

        // console.log(attachments);

        /* Sends email */
        try {
            await new Email(req.headers.host, 'New career form', JSON.parse(labels), formFields, attachments).send();
            // await new Email(req.headers.host, 'New career form', labels, fields, attachments).send();

            return res.status(201).json({
                data: {
                    formFields,
                    attachments
                },
                message: 'Thank you, your message has been sent successfully.'
            });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'An error occurred while sending the email' });
        }

    } catch (err) {
        if (err instanceof formidableErrors.FormidableError) {
            let message = 'An error has occurred';

            /* Form data validation is done by yup */

            /* Checks specific formidable error according to the object's configuration */
            // if (err.code === formidableErrors.biggerThanMaxFileSize) {
            //     message = 'Max file size 4MB exceeded';
            // }

            return res.status(err.httpCode || 400).json({ data: null, message });
        }

        if (err instanceof ValidationError) {
            let validationErrors = {}

            err.inner.forEach((error) => {
                if (!validationErrors[error.path])
                    validationErrors[error.path] = error.errors[0];
            });

            return res.status(400).json({ data: null, errors: validationErrors });
        }

        return res.status(500).json({ data: null, message: 'Internal Server Error' });
    }
}