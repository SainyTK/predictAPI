import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.port || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/', (req, res) => {
    let data = req.body;
    res.send(data);
})

app.listen(PORT, () => {
    console.log(`listening to port : ${PORT}`);
})