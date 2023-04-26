import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default function handler(req, res) {

    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    console.log('Verify Token', token);

    jwt.verify(token, 'auth_task', async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = decoded.id;

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        res.status(200).json({ user });
    });

}
