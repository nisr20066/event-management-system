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
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get bookings");
  }

  return await response.json();
};
