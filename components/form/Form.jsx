import styles from '../../styles/modules/Form.module.scss';
import { useController, useForm } from 'react-hook-form';
import useUnsavedChanges from '@/hooks/useUnsavedChanges';
import classNames from 'classnames';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import Button from '../Button';

import FormSelect from './FormSelect';
import FormCheckboxList from './FormCheckboxList';
import FormRadioList from './FormRadioList';


import { useState } from 'react';
import FileInput from './FormFileInput';

async function saveFormData(data) {
    console.log('save form data');
    console.log(data);

    // const formData = new FormData();
    // formData.append('file', data.file[0]);

    // return await fetch("/api/form", {
    //     // body: JSON.stringify(data),
    //     body: formData,
    //     // headers: {"Content-Type": "application/json"},
    //     method: "POST"
    // });
}

// const FileInput = ({ control, name }) => {
//     const { field } = useController({ control, name });
//     const [value, setValue] = useState("");
//     return (
//         <input
//             type="file"
//             value={value}
//             onChange={(e) => {
//                 setValue(e.target.value);
//                 field.onChange(e.target.files);
//             }}
//         />
//     );
// };

export default function Form() {
    const {register, control, handleSubmit, setError, reset, formState: { isSubmitting, isSubmitSuccessful, errors, isDirty }} = useForm();
    useUnsavedChanges(isDirty);

    const onSubmit = async (data) => {
        console.log(data);
        // const response = await saveFormData(data);

        // if (response.status === 400) {
        //     // Validation error
        //     // Expect response to be a JSON response with the structure:
        //     // {"fieldName": "error message for that field"}
        //     const fieldToErrorMessage = await response.json();
        //     for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
        //         setError(fieldName, {type: 'custom', message: errorMessage});
        //     }
        // } else if (response.ok) {
        //     // successful

        //     /* reset the form values */
        //     reset();
        // } else {
        //     // unknown error
        // }
    };

    // const onSubmit = (data) => console.log(data);

    return(
        <form className={classNames('u-spacing--responsive--bottom', styles['c-form'])} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="o-container">
                <div className={styles['c-form__row']}>
                    <FormInput
                        htmlFor="firstname"
                        label="Firstname"
                        id="firstname"
                        name="firstname"
                        required={true}
                        className="c-formElement--bordered"
                        settings={{...register("firstname", {required: true})}}
                        errors={errors['firstname']}
                    />
                    <FormInput
                        htmlFor="lastname"
                        label="Lastname"
                        id="lastname"
                        name="lastname"
                        required={true}
                        className="c-formElement--bordered"
                        settings={{...register("lastname", {required: true})}}
                        errors={errors['lastname']}
                    />
                </div>
                <FormInput
                    htmlFor="email"
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    className="c-formElement--bordered"
                    settings={{...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}}
                    errors={errors['email']}
                />
                {/* <FormInput
                    htmlFor="resume"
                    label="Resume"
                    type="file"
                    id="resume"
                    name="resume"
                    required={true}
                    className="c-formElement--upload--bordered"
                    // settings={{...register("resume", {required: true,
                    // validate: (files) => {
                    //     const regex = new RegExp(/[^\s]+(.*?).(jpe?g|png|docx?|pdf)$/i);
                    //     return regex.test(files[0]?.name) || 'Unauthorized format, only jpeg, jpg, png, doc, docx and pdf are valid';
                    // }})}}
                    // errors={errors['resume']}
                    control={control}
                    isSubmitSuccessful={isSubmitSuccessful}
                /> */}
                {/* <FileInput name="file" control={control} /> */}
                <FormSelect
                    htmlFor="subject"
                    label="Subject"
                    id="subject"
                    name="subject"
                    required={true}
                    className="c-formElement--select--bordered"
                    settings={{...register("subject", {required: true})}}
                    errors={errors['subject']}
                />
                <FormCheckboxList
                    title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                    name="choices"
                    register={register}
                    errors={errors['choices']}
                />
                <FormRadioList
                    title="Quos fugiat assumenda dolore optio est, corporis sit similique ?"
                    name="question"
                    register={register}
                    errors={errors['question']}
                />
                <FormTextarea
                    htmlFor="message"
                    label="Message"
                    id="message"
                    name="message"
                    required={true}
                    className="c-formElement--bordered"
                    settings={{...register("message", {required: true})}}
                    errors={errors['message']}
                />
                <Button
                    label="Send"
                    className="c-btn"
                    wrapperClassName={classNames(styles['c-form__btn'], {'c-formElement--submit': isSubmitting})}
                    type="submit"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
}