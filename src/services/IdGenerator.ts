import { v4 } from "uuid"

export default abstract class IdGenerator{
    static execute():string{
        return v4()
    }
}
