import cors from 'cors';

export const corsOptions = cors({
  origin: '*',
  credentials: true,
});
