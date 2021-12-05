import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import {MembershipModule} from './membership/membership.module';
import {CafeModule} from './cafe/cafe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,
        };
      },
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        return {
          path: '/v1/graphql',
          introspection: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault],
          installSubscriptionHandlers: true,
          autoSchemaFile: 'graphql-schema.gql',
        };
      },
    }),
    MembershipModule,
    CafeModule,
  ],
})
export class AppModule {}
