// import { defineStore } from "pinia";

// export const useBookingStore = defineStore("booking", {
//   state: () => ({
//     eventId: null,
//     eventTitle: "",
//     ticketPrice: 0,
//     selectedSeats: [],
//   }),

//   actions: {
//     setEvent(event) {
//       this.eventId = event.id;
//       this.eventTitle = event.title;
//       this.ticketPrice = event.ticket_price;
//     },

//     toggleSeat(seatId) {
//       const index = this.selectedSeats.indexOf(seatId);

//       if (index === -1) {
//         this.selectedSeats.push(seatId);
//       } else {
//         this.selectedSeats.splice(index, 1);
//       }
//     },

//     clearBooking() {
//       this.eventId = null;
//       this.eventTitle = "";
//       this.ticketPrice = 0;
//       this.selectedSeats = [];
//     },
//   },
// });

import { defineStore } from "pinia";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    eventId: null,
    eventTitle: "",
    ticketPrice: 0,
    selectedSeats: [],
  }),

  actions: {
    setEvent(event) {
      this.eventId = event.id;
      this.eventTitle = event.title;
      this.ticketPrice = event.ticket_price;
    },

    toggleSeat(seatId) {
      if (this.selectedSeats.includes(seatId)) {
        this.selectedSeats = this.selectedSeats.filter(
          (id) => id !== seatId
        );
      } else {
        this.selectedSeats.push(seatId);
      }
    },

    clearBooking() {
      this.eventId = null;
      this.eventTitle = "";
      this.ticketPrice = 0;
      this.selectedSeats = [];
    },
  },
});