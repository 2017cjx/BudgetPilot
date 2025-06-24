import jwt from 'jsonwebtoken';
import env from '../config/env';

if (!env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export async function generateToken(email: string, username: string): Promise<string> {
  return jwt.sign({ username, email }, env.JWT_SECRET as string, { expiresIn: '1h' });
}

export async function verifyToken(token: string): Promise<string | jwt.JwtPayload> {
  try {
    return jwt.verify(token, env.JWT_SECRET as string);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}