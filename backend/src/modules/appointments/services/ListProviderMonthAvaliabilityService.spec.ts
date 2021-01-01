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
      date: new Date(2021, 1, 1, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 2, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 1, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 1, 14, 0, 0),
    });

    const availability = await listProviderMonthAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 1,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 1, available: false },
      { day: 1, available: false },
      { day: 1, available: false },
      { day: 1, available: false },
    ]));

  });
})
