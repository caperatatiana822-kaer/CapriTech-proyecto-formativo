class Response {
    constructor(success, message, data = null, error = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    get json() {
        return {
            success: this.success,
            message: this.message,
            data: this.data,
            error: this.error
        }
    }
};

module.exports = Response;