import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import { DefaultMsgResponse } from '../types/DefaultMsgResponse';
import mongoose from 'mongoose';
export const connect = (handler: NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse<DefaultMsgResponse>) => {
        console.log('MongoDB readyState', mongoose.connections[0].readyState);
        if(mongoose.connections[0].readyState){
            return handler(req, res);
        }

        //const DB_CONNECTION_STRING = 'mongodb://localhost:27017/87aoj-gerenciador-tarefas';
        const DB_CONNECTION_STRING = 'mongodb+srv://leoss:220277@cluster0.kdha5wb.mongodb.net/?retryWrites=true&w=majority';
        
        mongoose.connection.on('connected', () => console.log('Conectado no banco de dados'));
        mongoose.connection.on('connected', err => console.log('Erro ao conectar no banco de dados'));
        
        await mongoose.connect(DB_CONNECTION_STRING);
        
        return handler(req, res);

    }