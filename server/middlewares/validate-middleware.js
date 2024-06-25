const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        // console.log(req.body);
        console.log(parseBody);
        next();
    } catch (err) {
        // console.log(err);
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        // console.log(extraDetails)
        const error = {
            status,
            message,
            extraDetails
        }
        next(error);
    }
}

export default validate;