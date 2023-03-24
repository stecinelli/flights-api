import { IFlightsRoute, IFlight, IFlightInfo } from '../../types/flights.types'
import LayoverService from '../services/layover.services'

export const flightsData: IFlightsRoute[] = require('../../database/flights.data.json');

export default class FlightsController {
  list(departureDestination: string, arrivalDestination: string, date?: string, maxPrice?: number): IFlightsRoute {

    let machingRoutes: IFlightsRoute[] = flightsData
      .filter((r: IFlightsRoute) => r.departureDestination === departureDestination
        && r.arrivalDestination === arrivalDestination);

    let machingFlights: IFlightsRoute | undefined = undefined;

    if (machingRoutes.length > 0) {
      machingFlights = machingRoutes[0];

    } else {
      const layoverRoute = LayoverService.create(departureDestination, arrivalDestination);
      machingFlights = layoverRoute;
    }

    if (date) {
      const filteredRoute: IFlight[] = machingFlights!.itineraries.filter((f: IFlight) => f.departureAt.slice(1, 10) === date.slice(1, 10))
      const machingFlightsFiltered: IFlightsRoute = {
        route_id: machingFlights!.route_id,
        departureDestination: machingFlights!.departureDestination,
        arrivalDestination: machingFlights!.arrivalDestination,
        itineraries: filteredRoute
      }
      return machingFlightsFiltered;

    } else return machingFlights!

  }

  find(flight_id: string): IFlightInfo | void {
    let flightInfo: IFlightInfo | null = null

    flightsData.map((route: IFlightsRoute) => {

      const flight: IFlight | undefined = route.itineraries
        .find((flight: IFlight) => flight.flight_id === flight_id)

      if (flight !== undefined) {
        flightInfo = {
          flight_id,
          arrivalDestination: route.arrivalDestination,
          departureDestination: route.departureDestination,
          departureAt: flight.departureAt,
          arrivalAt: flight.arrivalAt,
        }
      }
    })

    if(flightInfo) {
      return flightInfo
    } else throw new Error("flight_id not found");

  }
}