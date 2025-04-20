import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connect = () => {

        mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster45.nw9hcqc.mongodb.net/MkQuote?retryWrites=true&w=majority`);

    const connection = mongoose.connection;

    connection.on('error', () => {
        console.log('Erro ao conectar ao banco de dados');
    });

    connection.on('open', () => {
        console.log('Banco de dados conectado com sucesso');
    });
}

export default connect;