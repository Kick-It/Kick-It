module.exports = {
  development: {
    client: 'postgresql',
    connection: {
    	hostname: 'postgres',
    	host: 'localhost',
    	port: '5432'
    }
  },
  production: {
	client: 'postgresql',
	connection: process.env.DATABASE_URL
  }
}