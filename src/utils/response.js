module.exports = {
    success: (res, data, message, status=200) => {
        return res.status(status).json({
            success: true,
            message,
            data
        });
    },
    error: (res, message, status=400) => {
        return res.status(status).json({
            success: false,
            message
        });
    }
}