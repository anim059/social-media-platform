
export const errorHandle = (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
}