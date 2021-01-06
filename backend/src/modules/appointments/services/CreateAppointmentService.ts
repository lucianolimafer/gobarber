import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';



interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
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

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
0
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,

    });

    return appointment;
  }
}

export default CreateAppointmentService;
