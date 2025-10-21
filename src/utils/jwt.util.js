import { env } from '#config/env.config.js';
import jwt from 'jsonwebtoken';

export const JWT = {
  generateToken(payload, options = { expiresIn: env.JWT_EXPIRES_IN }) {
    return jwt.sign(payload, env.JWT_SECRET, options);
  },

  verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
  },

  decodeToken(token) {
    return jwt.decode(token);
  },
};
