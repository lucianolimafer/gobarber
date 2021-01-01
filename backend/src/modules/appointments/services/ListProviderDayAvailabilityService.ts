import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';


import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvaliabilityService{
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });

    const hourStart = 8;
    const eachHourArray = Array.from({ length: 13 }, (_, index) => index + hourStart );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHours = appointmentsInDay.find(appointment => getHours(appointment.date) === hour);

      return {
        hour,
        available: !hasAppointmentInHours,
      }
    });

    return availability;
  }
}

export default ListProviderDayAvaliabilityService;
