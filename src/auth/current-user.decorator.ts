import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserSchema } from 'src/users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserSchema => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
