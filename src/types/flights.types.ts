export interface IFlight {
  flight_id: string,
  departureAt: string,
  arrivalAt: string,
  availableSeats: number,
  layover?: {
    flight_id: string,
    departureAt: string,
    arrivalAt: string,
    availableSeats: number,
    prices: {
      currency: string,
      adult: number,
      child: number
    }  
  },
  waitHours?: number,
  prices: {
    currency: string,
    adult: number,
    child: number
  }
};

export interface IFlightsRoute  {
  route_id: string,
  departureDestination: string,
  arrivalDestination: string,
  itineraries: IFlight[]
}