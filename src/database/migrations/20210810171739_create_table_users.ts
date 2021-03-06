import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username', 45).notNullable().unique()
        table.string('password', 45).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}