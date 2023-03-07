import IBooking from "src/types/booking.types";

let bookingData: IBooking[] = require('../../database/booking.data.json');

export default class BookingController {
  list(email: string, flight_id?: string): IBooking[] {
    return flight_id
      ? bookingData.filter(b => b.email === email && b.flight_id === flight_id)
      : bookingData.filter(b => b.email === email)
  }

  add(booking: IBooking): number {

    if (bookingData.find(b=> b.flight_id === booking.flight_id && b.email === booking.email)) {
      return 400;
    } 
    else {
      bookingData.push(booking);
      return 200;
    }
  }

  delete(email: string, flight_id: string): number {
    const filteredBookingData = bookingData
      .filter(b => b.email === email && b.flight_id === flight_id);

    if (!filteredBookingData || filteredBookingData.length === 0) return 400;

    const index = bookingData.indexOf(filteredBookingData[0]);
    bookingData.splice(index, 1);

    return 204
  }

  edit(email: string, flight_id: string, userName?: string, bookedSeats?: number): number {
    const bookingDataToEdit = bookingData
      .filter(b => b.email === email && b.flight_id === flight_id);

    if (!bookingDataToEdit || bookingDataToEdit.length === 0) return 400;

    const index = bookingData.indexOf(bookingDataToEdit[0]);

    bookingData.splice(index, 1);

    if (userName) bookingDataToEdit[0].userName = userName;
    if (bookedSeats) bookingDataToEdit[0].bookedSeats = bookedSeats;

    bookingData.push(bookingDataToEdit[0]);

    return 204
  }
}