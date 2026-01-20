// intercepta as req, checa o token e add o id do user no req

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { error } from "node:console";

declare global {
    namespace Express {
        interface Request {
            userId?: number; //pega do schema.prisma
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // O padrão é enviar "Bearer <token_gigante>".
    // O .split(' ') divide a string no espaço.
    // A vírgula [, token] ignora a primeira parte ("Bearer") e pega só a segunda (o token).
    const [, token] = authHeader.split(' ');

    if(!token){
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if(!secret) throw new Error("JWT_SECRET não definido no .env");

        const decoded = jwt.verify(token, secret) as { id: number };
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};