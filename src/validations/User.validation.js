import joi from 'joi';

// User Validation Using JOI
const ValidationSchema = (req, res, next) => {
    try {
        const Schema = joi.object({
            FirstName: joi.string().required(),
            LastName: joi.string().required(),
            Email: joi.string().required(),
            Mobile: joi.number().required(),
            Image: joi.string().required()
        });

        const { error, value } = Schema.validate(req.body.formdata)

        if (error) {
            throw new Error(`validation error : ${error.details.map(x => x.message).join(', ')}`);
        } else {
            req.body = value;
            next();
        }
    } catch (error) {
        res.send({
            message: error.message,
            status: 400,
            data: null
        });
    }
}

export { ValidationSchema }