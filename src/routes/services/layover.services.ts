import { IFlightsRoute, IFlight } from '../../types/flights.types'
import { flightsData } from '../flights/flights.controller'

export default class LayoverService {

  static create(departureDestination: string, arrivalDestination: string): IFlightsRoute {
    const routesListInReqDeparture: IFlightsRoute[] = flightsData
      .filter((r: IFlightsRoute) => r.departureDestination === departureDestination)

    const routesListInReqArrival: IFlightsRoute[] = flightsData
      .filter((r: IFlightsRoute) => r.arrivalDestination === arrivalDestination)

    let layoverRoute2: IFlightsRoute | undefined = undefined;

    routesListInReqDeparture.forEach((r: IFlightsRoute) => {
      layoverRoute2 = routesListInReqArrival
        .find((newR: IFlightsRoute) => newR.departureDestination === r.arrivalDestination)
    })

    layoverRoute2!.itineraries.sort((a, b) => +new Date(a.departureAt) - +new Date(b.departureAt))

    const layoverRoute1: IFlightsRoute = routesListInReqDeparture
      .filter((r: IFlightsRoute) => r.arrivalDestination === layoverRoute2?.departureDestination)[0]

    layoverRoute1.itineraries.sort((a, b) => +new Date(a.departureAt) - +new Date(b.departureAt))

    let layoverItineraries: IFlight[] = [];

    const newArr: IFlight[] = layoverRoute1.itineraries;
    newArr.pop();
    newArr.map((f: IFlight, i: number) => {
      const flight2: IFlight = layoverRoute2!.itineraries[i + 1];

      const newFlight: IFlight = {
        flight_id: `${f.flight_id}LAYOVER`,
        departureAt: f.departureAt,
        arrivalAt: f.arrivalAt,
        availableSeats: f.availableSeats,
        layover: flight2,
        waitHours: ((+new Date((flight2.departureAt)).getTime() - +new Date(f.arrivalAt).getTime()) / 1000) / 3600,
        prices: {
          currency: f.prices.currency,
          adult: f.prices.adult,
          child: f.prices.child
        },
      }

      layoverItineraries!.push(newFlight)
    })

    const layoverRoute: IFlightsRoute = {
      route_id: layoverRoute1.route_id + layoverRoute2!.route_id,
      departureDestination: departureDestination,
      arrivalDestination: arrivalDestination,
      itineraries: layoverItineraries!,
    }

    flightsData.push(layoverRoute);

    return layoverRoute as IFlightsRoute
  }
}