import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';


interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsReporitory')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ date, provider_id, user_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create an appointment on a past date.");
    }

    if(user_id === provider_id){
      throw new AppError("You can't create an appointment with yourself");
    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 20){
      throw new AppError("You can't create an appointment before 8am and after 8pm");
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );
0
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,

    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      content: `Novo agendamento para o dia ${dateFormatted}`,
      recipient_id: provider_id,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
    )

    return appointment;
  }
}

export default CreateAppointmentService;
