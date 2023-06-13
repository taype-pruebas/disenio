import server from './src/server'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`)
})

server.on('error', (error) => {
    console.log('ocurrio un error', error);
})