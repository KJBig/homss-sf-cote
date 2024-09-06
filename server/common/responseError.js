export default class ResponseError extends Error {
    constructor({ responseCode }) {
        super();
        this.responseCode = responseCode;
        Error.captureStackTrace(this, this.constructor);
    }
}