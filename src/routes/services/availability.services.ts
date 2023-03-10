import { IFlightsRoute, IFlight } from '../../types/flights.types'
import { flightsData } from '../flights/flights.controller'

export default class AvailabilityService {
  static book(flight_id: string, bookedSeats: number) {

    let bookStatus: string = '';

    flightsData.forEach((r: IFlightsRoute) =>
      r.itineraries.forEach((f: IFlight) => {
        if (f.flight_id === flight_id && f.availableSeats > bookedSeats) {
          f.availableSeats -= bookedSeats;
          bookStatus = 'OK'
          return
        }
      })
    );

    if (bookStatus !== 'OK') throw new Error('not able to unbook');

  }

  static unbook(flight_id: string, bookedSeats: number) {

    let bookStatus: string = '';

    flightsData.forEach((r: IFlightsRoute) =>
      r.itineraries.forEach((f: IFlight) => {
        if (f.flight_id === flight_id) {
          f.availableSeats += bookedSeats;
          bookStatus = 'OK';
          return
        }
      })
    );
    if (bookStatus !== 'OK') throw new Error('not able to unbook');
  }

  static verify(flight_id: string, bookedSeats: number): string {

    let flightSeats: Array<IFlight> = [];
    flightsData.forEach(r => flightSeats = r.itineraries.filter(f => f.flight_id === flight_id));

    return flightSeats[0].availableSeats > bookedSeats
      ? 'available'
      : 'unavailable'
  }
}
