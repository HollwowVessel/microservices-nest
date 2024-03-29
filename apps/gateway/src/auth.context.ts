import { AUTH_SERVICE } from '@app/common';
import { UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { app } from './app';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);

    const user = await lastValueFrom(
      authClient.send('authenticate', {
        token: req.headers.token,
      }),
    );

    return user;
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
