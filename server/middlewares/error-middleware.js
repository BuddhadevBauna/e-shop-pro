const errorMiddleware = (err, req, res, next) => {
    // console.log(err);
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    const data = err.data || {};
    return res.status(status).json({message, data});
}

export default errorMiddleware;