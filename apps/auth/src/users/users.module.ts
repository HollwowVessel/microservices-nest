import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { LocalStrategy } from '../strategies/local.strategy';
import { UserDocument, UserSchema } from './models/user.model';
import { UsersRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, LocalStrategy],
  exports: [UsersService],
})
export class UsersModule {}
