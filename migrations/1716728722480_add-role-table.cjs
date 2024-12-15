/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('role', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
  });

  pgm.sql(`INSERT INTO role (name) VALUES ('user')`);
  pgm.sql(`INSERT INTO role (name) VALUES ('admin')`);
  pgm.sql(`INSERT INTO role (name) VALUES ('moderator')`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
