import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvailabilityService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaliability: ListProviderDayAvaliabilityService;



describe('ListProviderDayAvaliability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaliability = new ListProviderDayAvaliabilityService(fakeAppointmentsRepository);
  });


  it('should be able to list on day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 1, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 1, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 1,
      day: 20
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, day: 20, available: false },
      { hour: 9, day: 20, available: true },
      { hour: 10, day: 20, available: false },
      { hour: 11, day: 20, available: true }
    ]));

  });
})
