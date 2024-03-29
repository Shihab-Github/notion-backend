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
        userId: user._id.toHexString()
    }

    const expires = new Date()
    expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPayload)
    // response.cookie('Authentication', token, {
    //     httpOnly: true,
    //     expires
    // })
    return {
      access_token: token
    }
  }
}
