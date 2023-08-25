import express from 'express';
import appConfiguration from '../app/app.js';
import helmet from 'helmet';
import { authenticateMiddleware } from '../middleware/authentication.js';
import { errorHandle } from '../middleware/errorHandle.js';
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(authenticateMiddleware);

appConfiguration(app);

app.use(errorHandle);

export default app;