// centralizando as validações
import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(4, "O nome deve ter no mínimo 4 caracteres."),
    username: z.string().min(4, "O nome de usuário precisa ter pelo menos 4 caracteres."),
    email: z.string().email("Formato de email inválido."),
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres."),
});

export const loginSchema = z.object({
    identifier: z.string().min(3, "Digite seu email ou nome de usuário."),
    password: z.string().min(1, "A senha é obrigatória")
});