import Booking from "../models/RoomBooking.js";

// CREATE
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      requestedBy: req.user.id
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("requestedBy", "name");
  res.json(bookings);
};

// UPDATE
export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(booking);
};

//my bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    requestedBy: req.user.id
  });

  res.json(bookings);
};