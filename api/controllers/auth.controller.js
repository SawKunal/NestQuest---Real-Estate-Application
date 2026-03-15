import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) =>{
    const {username, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({message : "New user created"});
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Failed to create new user"})
    }
}
export const login = async (req, res) =>{
    //db operations
    const {username, password} = req.body;

    try{
        const user = await prisma.user.findUnique({
            where:{
                username
            }
        })
        if(!user){
            return res.status(401).json({message : "Invalid credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid credentials"})
        }

        //Generate JWT Cookie

        // res.setHeader("Set-cookie", "test=" + "myValue").json({message : "Login successful"})

        const age = 1000 * 60 * 60 * 24 * 7 ; // 7 days
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: false,
            avatar: user.avatar
        }, process.env.JWT_SECRET_KEY, {expiresIn: age})

        const {password: userPassword, ...userInfo} = user;

        res.cookie("token", token, {
            httponly: true,
            secure: true,
            maxAge: age
        }).status(200).json(userInfo);

    } catch(err){
        console.log(err)
        res.status(500).json({message : "Login failed"})
    }
}
export const logout = (req, res) =>{
    //db operations
    res.clearCookie("token").json({message : "Logout successful"})
}