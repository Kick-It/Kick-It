  module.exports = {
  development: {
    client: 'pg',
    connection: {
    	hostname: 'postgres',
    	host: 'localhost',
    	port: '5432'
    }
  },
  production: {
	client: 'pg',
	connection: process.env.DATABASE_URL
  }
}