import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../../users/repositories/Fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;


describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();


    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '01010101',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('01010101');
    expect(updatedUser?.password).toBe('01010101');
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '16545641'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non existing uses', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPassword.execute({
        token,
        password: '16545641'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password is passed more than 2h', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date;

      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(resetPassword.execute({
      password: '01010101',
      token,
    })).rejects.toBeInstanceOf(AppError);
  });
});
