import express from 'express';
import logger from '#config/logger.config.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions } from '#config/cors.config.js';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middlewares/security.middleware.js';

const app = express();

app.use(securityMiddleware);
app.use(helmet());
app.use(corsOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: {
      write: message => logger.info(message.trim()),
    },
  })
);

app.get('/api', (req, res) => {
  logger.info('Root endpoint accessed');
  res.send('Hello, World!!');
});

app.get('/health', (req, res) =>
  res
    .status(200)
    .json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
);

app.use('/api/v1/auth', authRoutes);

export default app;
