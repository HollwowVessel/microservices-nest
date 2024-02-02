import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserDocument } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => UserDocument)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => UserDocument)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Query(() => UserDocument, { name: 'user' })
  getUser(
    @Args('getUserDto', { type: () => GetUserDto }) getUserDto: GetUserDto,
  ) {
    return this.userService.getUser(getUserDto);
  }

  @Query(() => [UserDocument], { name: 'users' })
  getUsers() {
    return this.userService.getUsers();
  }
}
