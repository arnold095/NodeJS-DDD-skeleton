import { Context, Next } from 'koa';
import { IncomingHttpHeaders } from 'http';
import { NotAuthorized } from '@sharedDomain';
import { JwtVerifier } from '../../../Jwt/JwtVerifier';

export const AuthorizationMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  const jwt = jwtFromRequest(ctx.headers);
  ctx.currentUser = await JwtVerifier.run(jwt);
  await next();
};

const jwtFromRequest = ({ authorization }: IncomingHttpHeaders): string => {
  if (!authorization) {
    throw new NotAuthorized();
  }
  const jwt = authorization.split(' ');
  if (!jwt.length) {
    throw new NotAuthorized();
  }
  return jwt[1];
};
