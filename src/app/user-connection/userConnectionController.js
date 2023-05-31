import express from 'express';

const userConnectionRouter = express.Router();

const userConnectionConfig = (app) =>{
    app.use('/',userConnectionRouter);
}

export default userConnectionConfig;