import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("companies").del();

    // Inserts seed entries
    await knex("companies").insert([
        {
            razao_social: 'amazon',
            cnpj: '15.436.940/0001-03'
        },
        {
            razao_social: 'google',
            cnpj: '12.111.111/0002-11'
        },
    ]);
};
