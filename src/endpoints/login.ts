import { Request, Response } from "express";
import UserDatabase from "../database/UserDatabase";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Athenticator";
import BaseDB from "../database/BaseDatabase"



export default async function login (req: Request, res: Response): Promise<void> {
    try {
        
        const { email, password } = req.body;

        if(!email) {
            throw new Error("email not informed");
        } 

        if(!password) {
            throw new Error("password not informed");
        }

        const userData = new UserDatabase();
        const user = await userData.getUserByEmail(email);

        if(!user) {
            throw new Error("user not found");
        }

        const comparePassword = await HashManager.compare(password, user.password);

        if(!comparePassword) {
            throw new Error("Usuario ou senha incorretos")
        }

        const token = Authenticator.generateToken({id: user.id});

        res.status(200).send({
            "access_token": token
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        await BaseDB.destroyConnection();
    }
}