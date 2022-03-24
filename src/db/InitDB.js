import { Client } from 'pg'

const client = new Client(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.PORT
  }
)

const execute = async (query) =>{
  try{
    await client.connect()
    await client.query(query)
    return true
  } catch(error) {
    console.error(error.stack)
    return false
  } finally {
    await client.end()
  }
}

const query = `
    CREATE TABLE IF NOT EXISTS price (
	    timestamp TIMESTAMP DEFAULT NOW(),
	    pair VARCHAR(100) NOT NULL,
	    value NUMERIC(10,3) NOT NULL
    );`


execute(query).then(ok=>{
  if(ok) 
    console.log('Table created successfully')
})