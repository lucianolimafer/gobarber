import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';


export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {provider_id} = request.params;
    const { month, year} = request.query;

    const listProviderProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    })



    return response.json(availability);
  }
}
