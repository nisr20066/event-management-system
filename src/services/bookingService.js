// const BASE_URL = "https://eventhub-backend-m01d.onrender.com";

// export const getEventSeats = async (eventId) => {
//   const response = await fetch(
//     `${BASE_URL}/api/events/${eventId}/seats`
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch seats");
//   }

//   return await response.json();
// };

// export const createBooking = async (bookingData) => {
//   const response = await fetch(`${BASE_URL}/api/bookings`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(bookingData),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create booking");
//   }

//   return await response.json();
// };

// export const getBookings = async () => {
//   const response = await fetch(`${BASE_URL}/api/bookings`);

//   if (!response.ok) {
//     throw new Error("Failed to fetch bookings");
//   }

//   return await response.json();
// };


const BASE_URL = "https://eventhub-backend-m01d.onrender.com";

export const getEventSeats = async (eventId) => {
  const response = await fetch(
    `${BASE_URL}/api/events/${eventId}/seats`
  );

  if (!response.ok) {
    throw new Error("Failed to get seats");
  }

  const data = await response.json();

  return data;
};

export const getEvent = async (eventId) => {
  const response = await fetch(
    `${BASE_URL}/api/events/${eventId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get event");
  }

  const data = await response.json();

  return data;
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  const data = await response.json();

  return data;
};

export const getBookings = async () => {
  const response = await fetch(`${BASE_URL}/api/bookings`);

  if (!response.ok) {
    throw new Error("Failed to get bookings");
  }

  const data = await response.json();

  return data;
};