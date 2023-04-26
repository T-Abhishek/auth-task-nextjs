import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Not anyone can update the user, 
// only the user who logged in can update his own details

export default async function handler(req, res) {

    const { name, age, gender, dateOfBirth, phone, token } = req.body;

    console.log(req.body);

    if (!token) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, "auth_task");

    if (!decoded) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    const user = await prisma.users.update({
        where: {
            id: decoded.id,
        },
        data: {
            name: name || undefined,
            age: +age || undefined,
            gender: gender || undefined,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            phone: phone || undefined,
        },
    });

    return res.json({
        message: "User updated successfully",
        user: user
    });
}