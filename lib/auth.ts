import jwt from 'jsonwebtoken';

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'dev-secret';

export function verifyToken(token: string): null | { userId: number } {
  try {
    return jwt.verify(token, SECRET) as { userId: number };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}