import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '03030303',
      provider_id: '51515354',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('51515354');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 12, 8, 15);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '03030303',
      provider_id: '51515354',
    });

    expect(createAppointment.execute({
        date: appointmentDate,
        user_id: '03030303',
        provider_id: '51515354',
    })).rejects.toBeInstanceOf(AppError);
  });
});
