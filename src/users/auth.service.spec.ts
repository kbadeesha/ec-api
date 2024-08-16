// import { Test } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { UsersService } from './users.service';
// import { User } from './user.entity';
// import { NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dtos/create-user-dto';

// describe('AuthService', () => {
//   let service: AuthService;
//   let fakeUsersService: Partial<UsersService>;

//   beforeEach(async () => {
//     // Create a fake copy of the users service
//     const users: User[] = [];
//     fakeUsersService = {
//       find: (email: string) => {
//         const filteredUsers = users.filter((user) => user.email === email);
//         return Promise.resolve(filteredUsers);
//       },
//       create: (createUserDto: CreateUserDto) => {
//         const newUser = {
//           id: Date.now(),
//           email: createUserDto.email,
//           password: createUserDto.password,
//           firstName: createUserDto.firstName,
//           lastName: createUserDto.lastName,
//         } as User;
//         users.push(newUser);
//         return Promise.resolve(newUser);
//       },
//     };

//     const module = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: UsersService,
//           useValue: fakeUsersService,
//         },
//       ],
//     }).compile();

//     service = module.get(AuthService);
//   });

//   it('can create an instance of auth service', async () => {
//     expect(service).toBeDefined();
//   });

//   // it('creates a new user with a salted and hashed password', async () => {
//   //   const user = await service.signUp({
//   //     email: 'asdf@asdf.com',
//   //     password: 'asdf',
//   //   });

//   //   expect(user.password).not.toEqual('asdf');
//   //   const [salt, hash] = user.password.split('.');
//   //   expect(salt).toBeDefined();
//   //   expect(hash).toBeDefined();
//   // });

//   // it('throws an error if user signs up with email that is in use', async () => {
//   //   await service.signUp('asdf@asdf.com', 'asdf');
//   //   await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
//   //     BadRequestException,
//   //   );
//   // });

//   it('throws if signIn is called with an unused email', async () => {
//     await expect(
//       service.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
//     ).rejects.toThrow(NotFoundException);
//   });

//   // it('throws if an invalid password is provided', async () => {
//   //   await service.signUp('laskdjf@alskdfj.com', 'password');
//   //   await expect(
//   //     service.signIn('laskdjf@alskdfj.com', 'laksdlfkj'),
//   //   ).rejects.toThrow(BadRequestException);
//   // });
// });
