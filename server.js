import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ConnectMongo } from './src/config/db_connection';
import { router } from './src/routes/routes';
import LINK from './src/utils/RouteLinks';

const app = express();
require('dotenv').config();

const { BASE_API_URL } = LINK;

//Server Port
const PORT = process.env.PORT || 5000;

// DataBase Connection/Configuration Function
ConnectMongo();

app.use(cors());

app.use(bodyParser.json());

app.use(BASE_API_URL, express.static(__dirname + '/'));

//Base Api URL
app.use(BASE_API_URL, router)

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
})