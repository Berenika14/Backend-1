// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const sharedConfig = {
	useNullAsDefault: true,
	migrations: { directory: './data/migrations' },
	pool: {
		afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done),
	},
};

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/dev.db3',
		},
		...sharedConfig,
		seeds: { directory: './data/seeds' },
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
