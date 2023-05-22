import express from 'express';
import appConfiguration from '../app/app.js';
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

appConfiguration(app);

export default app;