import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {AuthUser, AuthUserSchema} from './schemas/authUser.schema';

const jwtModule = JwtModule.registerAsync({
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '3d'},
  }),
});

@Module({
  imports: [
    jwtModule,
    MongooseModule.forFeature([{name: AuthUser.name, schema: AuthUserSchema}]),
  ],
  exports: [
    jwtModule,
    MongooseModule.forFeature([{name: AuthUser.name, schema: AuthUserSchema}]),
  ],
})
export class AuthModule {}
