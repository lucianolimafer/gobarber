import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    //appointment.id = uuid();
    //appointment.date = date;
    //appointment.provider_id = provider_id;

    Object.assign(appointment, {
      id: uuidv4(),
      date,
      provider_id
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
