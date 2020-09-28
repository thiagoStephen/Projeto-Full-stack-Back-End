import { Request, Response } from "express";
import UserDatabase from "../database/UserDatabase";
import BaseDB from "../database/BaseDatabase";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Athenticator";

export default async function signup (
	req: Request,
	res: Response
): Promise<void> {
	try {
		const { name, nick_name, email, password } = req.body;

		if (!name.replace(/\s/g, "")) {
			throw new Error("Name not informed");
        }
        if (!nick_name.replace(/\s/g, "")) {
			throw new Error("Nick-Name not informed");
		}

		if (!email || email.indexOf("@") === -1) {
			throw new Error("Invalid email");
		}

		if (!password || password.length < 6) {
			throw new Error("Invalid password format");
		}

		const userData = {
            name: name,
            nick_name: nick_name,
			email: email,
			password: password,
		};

		const id = IdGenerator.execute();

		const cypherPassword = await HashManager.hash(userData.password);

		const userDb = new UserDatabase();
		await userDb.createUser(
			id,
            userData.name,
            userData.nick_name,
			userData.email,
			cypherPassword
		);

		const token = Authenticator.generateToken({ id });

		res.status(200).send({
			access_token: token
		});
	} catch (error) {
		res.status(400).send({
			message: error.message
		});
	} finally {
		await BaseDB.destroyConnection();	
	}
}