import AppError from '@shared/errors/AppError';


import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../../users/repositories/Fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;


describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();


    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
    );
  })
  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '01010101',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('01010101');
  });
});
