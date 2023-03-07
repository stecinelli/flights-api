export default interface IFlight {
  flight_id: string,
  departureAt: string,
  arrivalAt: string,
  availableSeats: number,
  prices: {
    currency: string,
    adult: number,
    child: number
  }
}

export default interface IFlightsRoute {
  route_id: string,
  departureDestination: string,
  arrivalDestination: string,
  itineraries: IFlight[]
}