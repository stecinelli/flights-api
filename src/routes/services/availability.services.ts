import IFlightsRoute from '../../types/flights.types'
import IFlight from '../../types/flights.types';

const flightsData: IFlightsRoute[] = require('../../database/flights.data.json');

export default class AvailabilityService {
  // verify - avaiability on flight
  static verify(flight_id: string, bookedSeats: number): string {

    let flightSeats: Array<IFlight> = [];
    flightsData.forEach(r => flightSeats = r.itineraries.filter(f => f.flight_id === flight_id));

    return flightSeats[0].availableSeats > bookedSeats
      ? 'available'
      : 'unavailable'
  }

  // book - decrease avaiability after booking confirmation
  static book(flight_id: string, bookedSeats: number): string {

    let bookStatus: string = '';

    flightsData.forEach((r: IFlightsRoute) =>
      r.itineraries.forEach((f: IFlight) => {
        if (f.flight_id === flight_id && f.availableSeats > bookedSeats) {
          f.availableSeats -= bookedSeats;
          return bookStatus = 'booked'
        } else bookStatus = 'not able to book'
      })
    );

    return bookStatus;

  }

  // unbook - increase avaiability after booking cancelation
  static unbook(flight_id: string, bookedSeats: number) {

    let bookStatus: string = '';
    
    flightsData.forEach((r: IFlightsRoute) =>
    r.itineraries.forEach((f: IFlight) => {
      if (f.flight_id === flight_id) {
        f.availableSeats += bookedSeats;
        return bookStatus = 'unbooked'
      } else bookStatus = 'not able to unbook'
    })
  );

  }
}
