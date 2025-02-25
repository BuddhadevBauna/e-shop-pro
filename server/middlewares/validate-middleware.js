const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        // console.log(parseBody);
        next();
    } catch (err) {
        console.log(err);
        const error = {
            status: 422,
            message: err.errors[0].message
        }
        next(error);
    }
}

export default validate;