import IFlightsRoute from '../../types/flights.types'
import IFlight from '../../types/flights.types';
import ILayovers from '../../types/flights.types';

const flightsData: IFlightsRoute[] = require('../../database/flights.data.json');

const layovers: Array<object> = [
  { route_id: "8efc39dd", departureDestination: "Oslo", arrivalDestination: "Stockholm" },
  { route_id: "42be9e9e", departureDestination: "Amsterdam", arrivalDestination: "Stockholm" },
  { route_id: "a35d65d2", departureDestination: "Stockholm", arrivalDestination: "Oslo" },
  { route_id: "52ec1574", departureDestination: "Stockholm", arrivalDestination: "Amsterdam" },
  { route_id: "c76824c1", departureDestination: "Amsterdam", arrivalDestination: "Oslo" },
]

export default class FlightsController {
  list(departureDestination: string, arrivalDestination: string, date?: string, maxPrice?: number): IFlight[] {

    let machingFlights: IFlight[] = flightsData
      .filter((r: IFlightsRoute) => r.departureDestination === departureDestination
        && r.arrivalDestination === arrivalDestination);

    if (machingFlights.length > 0) { machingFlights = machingFlights[0].itineraries }

    if (machingFlights.length <= 0) {
      // lista voos que saem do origem desejada
      const correctDeparture: IFlightsRoute[] = flightsData
        .filter((r: IFlightsRoute) => r.departureDestination === departureDestination)

      // lista voos que chegam no destino desejado
      const correctArrival: IFlightsRoute[] = flightsData
        .filter((r: IFlightsRoute) => r.arrivalDestination === arrivalDestination)

      // verifica se algum dos destinos da origem inicial tem saida para o destino final (traz a segunda rota)
      let correctLayoverRoute2: IFlightsRoute | undefined = undefined;

      correctDeparture.forEach((r: IFlightsRoute) => {
        correctLayoverRoute2 = correctArrival
          .find((newR: IFlightsRoute) => newR.departureDestination === r.arrivalDestination)
        console.log('correctLayoverV2', correctLayoverRoute2)
      })

      // encontra a primeira rota
      const correctLayoverRoute1: IFlightsRoute[] = correctDeparture
        .filter((r: IFlightsRoute) => r.arrivalDestination === correctLayoverRoute2?.departureDestination)

      // calcular tempo de espera entre chegada na escala e saida pro destino final
      // cria obj saida do voo 1, chegada do voo 2 e waitTime

      return machingFlights // WIP
    } else if (date) {
      return machingFlights.filter((f: IFlight) => f.departureAt.slice(1, 10) === date.slice(1, 10))
    } else
      return machingFlights


  }
}