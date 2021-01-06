import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;



describe('ListProviderMonthAvaliability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(fakeAppointmentsRepository);
  });


  it('should be able to show month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 18, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 19, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user-id',
      date: new Date(2021, 1, 20, 20, 0, 0),
    });

    const availability = await listProviderMonthAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 1,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 20, available: true }
    ]));

  });
})
