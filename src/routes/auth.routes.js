import { signIn, signUp } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;
