import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import foodDeliveryRoute from './routes/foodDeliveryRoute.js'

const PORT = process.env.PORT || 8888

const app = express()

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))

app.use(cors())

app.use('/', foodDeliveryRoute)


const CONNECTION_URL = 'mongodb+srv://amanbay:24214@cluster0.e1bgd.mongodb.net/foodDelivery?retryWrites=true&w=majority';


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify', false);