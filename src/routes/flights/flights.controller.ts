import IFlightsRoute from '../../types/flights.types'
import IFlight from '../../types/flights.types';

const flightsData: IFlightsRoute[] = require('../../database/flights.data.json');

export default class FlightsController {
  list(departureDestination: string, arrivalDestination: string, date?: string, maxPrice?: number ): IFlight[]  {
      const machingflightsData = flightsData
        .filter(r => r.departureDestination === departureDestination && r.arrivalDestination === arrivalDestination);
      return machingflightsData[0].itineraries
  }

/*   list(storeId?: number): IProduct[]  {
    return storeId
        ? data.filter(p => p.storeId === storeId)
        : data;
} */
  /* add(product: IProduct) {
      data.push(product);
  } */ 
}