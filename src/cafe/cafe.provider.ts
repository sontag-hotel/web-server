import { Connection } from 'mongoose'
import { CafeSchema } from './schemas/cafe.schema';

export const cafeProvider = [
    {
        provide: 'CAFE_MODEL',
        useFactory: (connection: Connection) => connection.model('Cafe', CafeSchema),
        inject: ['DATABASE_CONNECTION']
    }
]