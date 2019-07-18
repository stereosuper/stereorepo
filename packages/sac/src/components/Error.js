class SuperError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SuperError';
        this.message = message;
    }
    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
                stacktrace: this.stack
            }
        };
    }
}

export default SuperError;
