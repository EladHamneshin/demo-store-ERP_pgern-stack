import RequestError from './RequestError';

type MiddlewareError = Error | RequestError;

export default MiddlewareError;