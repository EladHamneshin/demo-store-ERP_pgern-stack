import RequestError from './RequestError.js';

type MiddlewareError = Error | RequestError;

export default MiddlewareError;