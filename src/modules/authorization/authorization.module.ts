import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { jwtConstants } from './constants';
import { UsersModule } from '../user/users.module';
import { AuthorizationController } from './authorization.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180d' },
    }),
  ],
  providers: [
    AuthorizationService,
    JwtStrategy,
    LocalStrategy,
  ],
  controllers: [AuthorizationController],
  exports: [AuthorizationService],
})
export class AuthModule {
}
