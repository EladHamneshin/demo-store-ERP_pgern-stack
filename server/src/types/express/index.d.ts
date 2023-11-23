export {};

declare global {
  namespace Express {
    interface Request {
      userId: string;
      isAuthenticated: boolean;
    }
  }
}