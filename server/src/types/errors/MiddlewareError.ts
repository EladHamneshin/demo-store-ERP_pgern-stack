import { DatabaseError as PgError} from 'pg';
import RequestError from './RequestError.js';

type MiddlewareError = PgError | Error | RequestError;

export default MiddlewareError;