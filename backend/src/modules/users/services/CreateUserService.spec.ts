import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeHashProvider from '../../users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';


let fakeUserssRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;


describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserssRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();


    createUser = new CreateUserService(
      fakeUserssRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Luciano Lima',
      email: '51515354',
      password: '16545641',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserService(
      fakeUserssRepository,
      fakeHashProvider,
      fakeCacheProvider
    );

    await createUser.execute({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    await expect(createUser.execute({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
