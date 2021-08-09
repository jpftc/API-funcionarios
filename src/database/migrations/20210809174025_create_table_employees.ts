import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('employees', (table) => {
        table.increments('id')
        table.string('nome', 45).notNullable()
        table.string('cpf', 45).notNullable().unique()
        table.decimal('salario', 8, 2)
        table.integer('empresa_id').notNullable().unsigned()

        table.foreign('empresa_id').references('id').inTable('companies')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('employees')
}