import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeHashProvider from '../../users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUserssRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();


    const authenticateUser = new AuthenticateUserService(
      fakeUserssRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(fakeUserssRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    })

    const response = await authenticateUser.execute({
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserssRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserssRepository,
      fakeHashProvider
    );

    expect(authenticateUser.execute({
      email: 'luciano@gmail.com',
      password: '16545641',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
