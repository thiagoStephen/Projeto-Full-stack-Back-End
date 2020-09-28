import BaseDB from "./BaseDatabase"

export interface Recipe {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    creatorUserId: string
}

export default class RecipesDatabase extends BaseDB {
    private static TABLE_NAME = "recipes"

    public async createRecipe (input: Recipe): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${RecipesDatabase.TABLE_NAME}
            VALUES (
                '${input.id}',
                '${input.title}',
                '${input.description}',
                '${input.createdAt}',
                '${input.creatorUserId}'
            )
        `)
    } 

    public async getRecipeById (id: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${RecipesDatabase.TABLE_NAME}
            WHERE id = '${id}'
        `)
        return result[0][0]
    }
}