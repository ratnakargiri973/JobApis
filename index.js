import express from 'express'
import 'dotenv/config';
import mongoose from 'mongoose';
import jobRouter from './Routes/jobRoutes.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', jobRouter);



mongoose.connect(process.env.MONGO_URL, {dbName: process.env.DB})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server has started at ${process.env.PORT}`);
    } )
})
.catch((err) => {
    console.log(err);
})



