import BaseDB from "./BaseDatabase";

export default class UserDatabase extends BaseDB { 
    
    private static USER_TABLE_NAME = "Users";
    
	public async createUser(
		id: string,
        name: string,
        nick_name: string,
		email: string,
		password: string
	): Promise<void> {
		await this.getConnection().raw(`
            INSERT INTO ${UserDatabase.USER_TABLE_NAME} (id, name, nick_name, email, password)
            VALUES (
                '${id}',
                '${name}',
                '${nick_name}',
                '${email}',
                '${password}'
            )        
        `);
	}
		
	public async getUserById(id: any) {
        const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE_NAME} 
			WHERE id = "${id}" 
		`) 		
		return result[0][0]
    }
    
	public async getUserByEmail(email: any): Promise<any> {
		const result = await this.getConnection().raw(`
			SELECT * FROM ${UserDatabase.USER_TABLE_NAME} 
			WHERE email = "${email}" 
		`) 		
		return result[0][0]
    }
}
