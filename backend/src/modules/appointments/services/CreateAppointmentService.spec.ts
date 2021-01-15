import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeNotificationsRepository = new FakeNotificationsRepository();


    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 12, 10, 13),
      user_id: '03030303',
      provider_id: '51515354',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('51515354');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 12, 8, 15);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '03030303',
      provider_id: '51515354',
    });

    await expect(createAppointment.execute({
        date: appointmentDate,
        user_id: '03030303',
        provider_id: '51515354',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 10, 9),
        user_id: '03030303',
        provider_id: '51515354',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as a provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 10, 9),
        user_id: '03030303',
        provider_id: '03030303',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment befor 8am and after 8pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 11, 21),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
