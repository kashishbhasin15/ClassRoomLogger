

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import './RoomAvailability.css';
import API from "../api/api";
import { timeSlots } from "../utils/timetable";
import { generateRooms } from "../utils/room";
import type { Room } from "../utils/room";
import { RoomBookingModal } from './RoomBookingModal';

interface Props {
  onRoomSelect?: (room: Room) => void;
  onBack?: () => void;
}

export const RoomAvailability = ({ onRoomSelect, onBack }: Props) => {

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("Block A");
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const rooms = generateRooms();

  // ✅ FETCH BOOKINGS (AUTO REFRESH)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ FILTER ROOMS
  const filteredRooms = rooms.filter(
    (room) => room.building === selectedBlock
  );

  // ✅ STATUS CHECK (EXACT MATCH)
  const checkStatus = (room: Room) => {

    if (!selectedTimeSlot) return "available";

    // if (isAutoBooked(room.number, selectedTimeSlot)) {
    //   return "occupied";
    // }

    const booked = bookings.some(
      (b) =>
        b.roomNumber === room.number &&
        b.buildingName === room.building &&
        b.date === selectedDate &&
        b.timeSlot === selectedTimeSlot &&
        b.status === "approved"
    );

    return booked ? "occupied" : "available";
  };

  // ✅ CLICK HANDLER
  const handleRoomClick = (room: Room) => {
    const status = checkStatus(room);
    if (status === "available" && onRoomSelect) {
      onRoomSelect(room);
    }
  };

  // ✅ FILTER FUTURE TIME SLOTS
const convertToMinutes = (time: string) => {
  let [hour, min] = time.split(":").map(Number);

  // 🔥 FIX: convert to 24-hour manually
  if (hour < 8) {
    hour += 12; // treat 1:00 as 13:00, 2:00 as 14:00
  }

  return hour * 60 + min;
};

const getFilteredTimeSlots = () => {
  const now = new Date();
  const selected = new Date(selectedDate);

  // current time in minutes
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // if not today → show all
  if (selected.toDateString() !== now.toDateString()) {
    return timeSlots;
  }

  return timeSlots.filter((slot) => {
    const end = slot.split("-")[1]; // take END time
    const slotEndMinutes = convertToMinutes(end);

    return slotEndMinutes > currentMinutes;
  });
};

  const handleBookRoom = (room: Room) => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot first");
      return;
    }
    setSelectedRoomForBooking(room);
  };

  return (
    <div className="room-availability">

      {onBack && (
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>
      )}

      {/* FILTERS */}
      <div className="availability-filters">

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* ✅ TIME SLOT DROPDOWN */}
        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">Select Time Slot</option>
          {getFilteredTimeSlots().map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <select
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
        >
          <option>Block A</option>
          <option>Block B</option>
          <option>Block C</option>
        </select>

      </div>

      {/* ROOMS GRID */}
      <div className="rooms-grid">
        {filteredRooms.map((room) => {
          const status = checkStatus(room);

          return (
            <div
              key={room.id}
              className={`room-card ${status}`}
              onClick={() => handleRoomClick(room)}
            >

              <div className="room-header">
                <h3>Room {room.number}</h3>
                <span className={`room-status ${status}`}>
                  {status === "available" ? "Available" : "Occupied"}
                </span>
              </div>

              <div className="room-details">
                <p>{room.building}</p>
                <p>Capacity: {room.capacity}</p>
              </div>

              {/* ✅ BUTTON CONTROL */}
              <div className="room-actions">
                {status === "available" ? (
                  <button
                    className="book-room-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookRoom(room);
                    }}
                  >
                    <BookOpen size={16} />
                    Book Room
                  </button>
                ) : (
                  <span className="booked-label">Already Booked</span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedRoomForBooking && (
        <RoomBookingModal
          room={selectedRoomForBooking}
          date={selectedDate}
          timeSlot={selectedTimeSlot}
          onClose={() => setSelectedRoomForBooking(null)}
        />
      )}

    </div>
  );
};