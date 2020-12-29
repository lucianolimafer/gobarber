import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';


let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;



describe('UpdadeProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });


  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const userProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe('Luciano Lima');
    expect(userProfile.email).toBe('luciano@gmail.com');
  });

  it('should not be able to show the profile from non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
