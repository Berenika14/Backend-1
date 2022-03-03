// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const pg = require('pg');

if (process.env.DATABASE_URL) {
	pg.defaults.ssl = { rejectUnauthorized: false };
}

const sharedConfig = {
	client: 'pg',
	migrations: { directory: './data/migrations' },
	seeds: { directory: './data/seeds' },
};

// For SQLITE Dev Testing
const sqliteConfig = {
	useNullAsDefault: true,
	migrations: { directory: './data/migrations' },
	pool: {
		afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done),
	},
};

module.exports = {
	development: {
		...sharedConfig,
		connection: process.env.DEV_DATABASE_URL,
	},

	testing: {
		...sharedConfig,
		connection: process.env.TESTING_DATABASE_URL,
	},

	production: {
		...sharedConfig,
		connection: process.env.DATABASE_URL,
		pool: { min: 2, max: 10 },
	},

	// For SQLITE Development (we shouldn't use this though)
	dev_sqlite: {
		client: 'sqlite3',
		connection: {
			filename: './data/dev.db3',
		},
		...sqliteConfig,
		seeds: { directory: './data/seeds' },
	},
};
