import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';


let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;



describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });


  it('should be able to show the list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'l1@gmail.com',
      password: '16545641',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Luciana Abel',
      email: 'l2@gmail.com',
      password: '16545641',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Thaina',
      email: 'thai@gmail.com',
      password: '16545641',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual([user1, user2]);
  });
})
