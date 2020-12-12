import AppError from '@shared/errors/AppError';


import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../users/repositories/Fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: 'luciano Lima',
      email: 'luciano@gmail.com',
      password: '16545641',
    });

    await sendForgotPasswordEmail.execute({
      email: 'luciano@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
