import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from 'src/interfaces/token-payload.interface';
import { UserSchema } from 'src/users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: UserSchema) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    return {
      access_token: token,
    };
  }
}
