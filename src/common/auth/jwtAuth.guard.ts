import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UnauthorizedException} from '../exceptions/graphql.exception';
import {AuthUser, AuthUserDocument} from './schemas/authUser.schema';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from '../decorator/public.decorator';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUserDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const {req} = ctx.getContext();

    const authorization = req.get('Authorization');
    const token = authorization?.replace(/(B|b)earer /, '');

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token);

      if (!payload.id) {
        throw new UnauthorizedException();
      }

      const user = await this.authUserModel
        .findOne({_id: payload.id})
        .lean()
        .exec();

      if (!user) {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
