import IBooking from "src/types/booking.types";
import AvailabilityService from '../services/availability.services'

let bookingData: IBooking[] = require('../../database/booking.data.json');

export default class BookingController {
  list(email: string, flight_id?: string): IBooking[] {
    return flight_id
      ? bookingData.filter(b => b.email === email && b.flight_id === flight_id)
      : bookingData.filter(b => b.email === email)
  }

  add(booking: IBooking): number {

    if (bookingData.find(b => b.flight_id === booking.flight_id && b.email === booking.email)) {
      return 400;
    }
    else {
      try {
        AvailabilityService.book(booking.flight_id, booking.bookedSeats);
        bookingData.push(booking);
        return 200;

      } catch (error) {
        return 400;
      }
    }
  }

  delete(email: string, flight_id: string): number {
    const filteredBookingData = bookingData
      .filter(b => b.email === email && b.flight_id === flight_id);

    if (!filteredBookingData || filteredBookingData.length === 0) return 400;

    const index = bookingData.indexOf(filteredBookingData[0]);

    try {
      AvailabilityService.unbook(flight_id, filteredBookingData[0].bookedSeats);
      bookingData.splice(index, 1);
      return 204

    } catch (error) {

      return 400
    }

  }

  edit(email: string, flight_id: string, userName?: string, bookedSeats?: number): number {
    const bookingDataToEdit = bookingData
      .filter(b => b.email === email && b.flight_id === flight_id);

    const index = bookingData.indexOf(bookingDataToEdit[0]);

    if (!bookingDataToEdit || bookingDataToEdit.length === 0) return 400;

    if (bookedSeats !== undefined) {
      try {
        AvailabilityService.book(flight_id, bookedSeats);
        AvailabilityService.unbook(flight_id, bookingDataToEdit[0].bookedSeats);

        bookingData.splice(index, 1);

        bookingDataToEdit[0].bookedSeats = bookedSeats;
        if (userName !== undefined) bookingDataToEdit[0].userName = userName;

        bookingData.push(bookingDataToEdit[0]);

        return 204

      } catch (error) {

        return 400
      }
    } else if (userName !== undefined) {

      bookingData.splice(index, 1);
      bookingDataToEdit[0].userName = userName
      bookingData.push(bookingDataToEdit[0]);

      return 204

    } else return 400;

  }
}