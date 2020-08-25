
exports.up = function(knex) {
  return knex.schema
  .createTable("users", function(table) {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("username").unique().notNullable();
      table.string("password").notNullable();
      table.index("username");
  })
  .createTable("posts", function(table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("title").notNullable();
    table.string("content");
    table.foreign("user_id").references("users.id");
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("users")
    .dropTable("posts")
};
