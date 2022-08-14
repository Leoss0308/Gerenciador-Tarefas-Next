import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import handler from "../pages/api/hello";
import {DefaultMessageResponse} from "../types/DefaultMessageResponse";
import mongoose from "mongoose";

export const connect = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
    console.log('MongoDB readyState', mongoose.connections[0].readyState)
    if (mongoose.connections[0].readyState){
        return handler(req, res);
    }

    const DB_CONNECTIONSTRING = 'mongodb+srv://87aoj-user:Usuario123@cluster0.m8ueg.mongodb.net/?retryWrites=true&w=majority';
    mongoose.connection.on('connected', () => console.log('Conectado no banco de Dados'));
    mongoose.connection.on('error', err => console.log('Erro ao conectar no banco de dados', err));
    await mongoose.connect(DB_CONNECTIONSTRING);

    return handler(req, res);
}