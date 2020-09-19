import { createConnection } from 'typeorm'
import 'reflect-metadata'

const connection = createConnection({
    name: 'sonia',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'sa_sonia',
    password: 'sa_sonia',
    database: 'sonia',
    synchronize: true,
    entities: ['src/entities/*.ts'],
    migrations: ['src/infrastructure/database/migrations/*.{ts,js}'],
    cli: {
        migrationsDir: 'src/infrastructure/database/migrations'
    }
}).then(() => {
    console.log('Conectado ao banco de dados')
}).catch(error => {
    console.log('Erro ao conectar com o banco de dados')
    console.log(error)
})

export { connection }
