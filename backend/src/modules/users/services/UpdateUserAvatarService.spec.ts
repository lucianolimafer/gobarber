import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';


let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;



describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });

  it('should be able to update a avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update a avatar from non existing user', async () => {
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete a old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'Luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar02.jpg',
    })

    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  });
});
