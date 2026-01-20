import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg'; // Novo import
import { Pool } from 'pg'; // Novo import
import bcrypt, { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const connectionString = process.env.DATABASE_URL;

// Garante que a URL existe
if (!connectionString) {
  throw new Error('DATABASE_URL não definida no .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class AuthController {

    // POST /auth/register
    async register(req: Request, res: Response){
        const result = registerSchema.safeParse(req.body);

        if(!result.success) return res.status(400).json({ errors: result.error.format() });

        const { name, username, email, password } = result.data;

        try {
            // checa se o usuario já está cadastrado
            const userExists = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { username: username }
                    ]
                }
            });
            if (userExists){
                if(userExists.email === email){
                    return res.status(400).json({ error: 'email already registered'});
                }
                if (userExists.username === username){
                    return res.status(400).json({ error: 'username already taken'});
                }
            }

            // hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // criar usuario
            const user = await prisma.user.create({
                data: {
                    name,
                    username,
                    email,
                    passwordHash: hashedPassword,
                },
            });

            // retorna as infos do usuario cadastrado
            return res.status(201).json({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'server error' });
        }
    }

    // POST /auth/login
    async login (req: Request, res: Response) {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) return res.status(400).json({ errors: result.error.format() });

        const { identifier, password } = result.data;

        try {
            const user = await prisma.user.findFirst({
                where:{
                    OR: [
                        { email: identifier },
                        { username: identifier },
                    ]
                }
            });

            if(!user) return res.status(401).json({ error: 'credenciais invalidas' });

            const isValidPassword = await bcrypt.compare(password, user.passwordHash)
            if(!isValidPassword) return res.status(401).json({ error: 'credenciais invalidas' });

            const secret = process.env.JWT_SECRET;
            if(!secret) throw new Error("JWT_SECRET faltando no .env");

            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

            return res.json({
                user: { id: user.id, name: user.name, username: user.username, email: user.email },
                token
            });

        } catch (error) {
            return res.status(500).json({ error: 'erro no login' });
        }
    }

    // GET /users/profile
    async getProfile(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: { id: true, name: true, username: true, email: true, createdAt: true }
            });

            if (!user) return res.status(404).json({ error: 'usuário não encontrado' });

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: 'erro ao buscar perfil' });
        }
    }

    // DELETE /users/profile
    async deleteProfile(req: Request, res: Response){
        try {
            const userId = req.userId;

            if(!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

            await prisma.user.delete({ where: {id: userId} });

            return res.status(200).json({ message: 'Usuário deletado com sucesso' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao excluir conta' });
        }
    }
}