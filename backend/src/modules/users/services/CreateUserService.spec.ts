import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserssRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserssRepository,
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
    const createUser = new CreateUserService(
      fakeUserssRepository,
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
