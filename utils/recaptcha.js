export const validateRecaptcha = async (token, res) => {
    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        })

        const result = await response.json();

        if (result?.success) {
            if (result?.score >= 0.5) {
                return true;
            }
            throw new Error(`ReCaptcha validation failed`);
        }
        throw new Error(`Error validating captcha: ${result['error-codes'][0]}`);

    } catch (err) {
        res.status(422).json({ data: null, message: err.message });
        return false;
    }
};