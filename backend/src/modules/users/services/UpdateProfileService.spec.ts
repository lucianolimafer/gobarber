import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import UpdadeProfileService from './UpdateProfileService';


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updadeProfile: UpdadeProfileService;



describe('UpdadeProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updadeProfile = new UpdadeProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  });


  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const updatedUser = await updadeProfile.execute({
      user_id: user.id,
      name: 'LucianoLL',
      email: 'luc@gmail.com',
    })

    expect(updatedUser.name).toBe('LucianoLL');
    expect(updatedUser.email).toBe('luc@gmail.com');
  });

  it('should be not able to change email within email existing', async () => {
    await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima Fer',
      email: 'lucio@gmail.com',
      password: '16545641',
    });

    await expect(
      updadeProfile.execute({
        user_id: user.id,
        name: 'LucianoLL',
        email: 'luciano@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const updatedUser = await updadeProfile.execute({
      user_id: user.id,
      name: 'LucianoLL',
      email: 'luciano@gmail.com',
      old_password: '16545641',
      password: '01010101',
    })

    expect(updatedUser.password).toBe('01010101');
  });

  it('should not be able to update the password whitout the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    await expect(
      updadeProfile.execute({
        user_id: user.id,
        name: 'LucianoLL',
        email: 'luciano@gmail.com',
        password: '01010101',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password whith wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    expect(
      updadeProfile.execute({
        user_id: user.id,
        name: 'Luciano LL',
        email: 'luciano@gmail.com',
        old_password: '5416546164',
        password: '16545641',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})
