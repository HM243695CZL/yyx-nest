import { join } from 'path';
export default {
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'yyx-nest-db',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
  autoLoadEntities: true
}
