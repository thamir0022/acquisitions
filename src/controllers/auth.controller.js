import { formatValidationErrors } from '#utils/format.util.js';
import { signInSchema, signUpSchema } from '#validations/auth.validation.js';
import logger from '#config/logger.config.js';
import { createUser, signInUser } from '#services/auth.service.js';
import { JWT } from '#utils/jwt.util.js';
import { Cookie } from '#utils/cookies.util.js';

export const signUp = async (req, res) => {
  try {
    const validatedResult = signUpSchema.safeParse(req.body);

    if (!validatedResult.success)
      return res.status(400).json({
        error: 'Invalid sign up data',
        details: formatValidationErrors(validatedResult.error),
      });

    const { name, email, password, role } = validatedResult.data;

    const user = await createUser({ name, email, password, role });

    const token = JWT.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    Cookie.set(res, 'token', token);

    res.status(201).json({
      message: 'User signed up successfully',
      user,
    });
  } catch (error) {
    logger.error(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    const validatedResult = signInSchema.safeParse(req.body);

    if (!validatedResult.success) throw new Error('Invalid sign in data');

    const { email, password } = validatedResult.data;

    const user = await signInUser({ email, password });

    const token = JWT.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    Cookie.set(res, 'token', token);

    res.status(200).json({
      message: 'User signed in successfully',
      user,
    });
  } catch (error) {
    throw new Error('Something went wrong during sign in', error);
  }
};
