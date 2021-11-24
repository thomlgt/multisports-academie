import express from 'express';
import cors from 'cors';
import { setMongoConnection } from './config/mongo.config';

const app = express();
const port = process.env["PORT"];

app.use(express.json());
app.use(cors());

//Lancement du serveur Node
app.listen(port, () => {
    console.log(`Serveur listening on port : ${port}`);
})

//Connexion à la base de donnée
setMongoConnection();

//Définition des routes
app.get("/", (req, res, next) => {
    res.send("hello world");
})

