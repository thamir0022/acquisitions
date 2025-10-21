import logger from '#config/logger.config.js';
import bcrypt from 'bcryptjs';
import { db } from '#config/drizzle.config.js';
import { eq } from 'drizzle-orm';
import { users } from '#models/user.model.js';

export const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    logger.debug(error);
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
      });

    return newUser;
  } catch (error) {
    logger.error(error);
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  } catch (error) {
    throw new Error('Error signing in user', error);
  }
};
