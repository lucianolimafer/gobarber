import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvaliabilityService{
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    })

    console.log(appointmentsInMonth);

    return [ { day: 1, available: false } ];
  }
}

export default ListProviderMonthAvaliabilityService;
