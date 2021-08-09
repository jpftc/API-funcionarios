import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('companies', (table) => {
        table.increments('id')
        table.string('razao_social', 45).notNullable()
        table.string('cnpj', 45).notNullable().unique()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('companies')
}