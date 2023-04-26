import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
        where: {
            email: (email + '').trim().toLowerCase()
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ id: user.id, ...user }, "auth_task", {
        expiresIn: '1d'
    });

    res.status(200).json({ token: token })
}
