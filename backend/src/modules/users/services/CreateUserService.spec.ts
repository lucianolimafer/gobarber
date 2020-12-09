import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeHashProvider from '../../users/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserssRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserssRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Luciano Lima',
      email: '51515354',
      password: '16545641',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user', async () => {
    const fakeUserssRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserssRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    expect(createUser.execute({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
