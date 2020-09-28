import * as jwt from "jsonwebtoken"

interface AuthenticationData {
    id: string
}

export default abstract class Authenticator {
    static generateToken(input: AuthenticationData) {
        return jwt.sign(
            input,
            process.env.JWT_KEY as string,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
    }

    static getTokenData(token: string): any {
        const tokenData = jwt.verify(
            token,
            process.env.JWT_KEY as string
        )
        return tokenData as AuthenticationData
    }
}