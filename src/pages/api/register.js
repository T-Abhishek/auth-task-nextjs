import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

    const { email, password, name } = req.body;

    try {
        const user = await prisma.users.create({
            data: {
                email,
                password,
                name
            }
        });
        console.log(user);
        res.status(200).json(user);
        return;
    } catch (err) {

        if (err.code === 'P2002') {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(500).json({ message: 'Internal server error' });
}
