import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as classifier from './classifier'

const PORT = process.env.port || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    classifier.showAccuracy().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.error(err);
    })
})

app.post('/', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`listening to port : ${PORT}`);
})