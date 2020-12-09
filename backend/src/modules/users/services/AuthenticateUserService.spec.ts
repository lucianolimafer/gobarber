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
});
