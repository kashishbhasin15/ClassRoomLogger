


import { useState } from 'react';
import { X, Send } from 'lucide-react';
import './RoomBookingModal.css';
import type { Room } from '../utils/room';
import API from "../api/api";
import { timeSlots } from "../utils/timetable";

interface RoomBookingModalProps {
  room: Room | null;
  onClose: () => void;
  date: string;
  timeSlot: string;
}

export const RoomBookingModal = ({ room, onClose }: RoomBookingModalProps) => {

  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',          // ✅ keep original
    numberOfHours: '1',     // ✅ keep original
    description: '',
    studentCount: ''
  });

  if (!room) return null;

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ MAP START TIME → SLOT
  const getTimeSlotFromStart = (startTime: string) => {
    const slot = timeSlots.find((s) => s.startsWith(startTime));
    return slot || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const slot = getTimeSlotFromStart(formData.startTime);

      if (!slot) {
        alert("Please select a valid start time");
        return;
      }

      await API.post(
        "/bookings",
        {
          roomNumber: room?.number,
          buildingName: room?.building,
          date: formData.date,
          timeSlot: slot, // ✅ FIXED SLOT

          teacherName: formData.teacherName,
          subject: formData.subject,
          reason: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Room booking requested successfully ✅");
      onClose();

    } catch (err: any) {
      console.error(err);
      alert("Booking failed ❌");
    }
  };

  // ✅ START TIME OPTIONS FROM YOUR SLOTS
  const startTimeOptions = timeSlots.map(slot => slot.split("-")[0]);

  const hourOptions = ['1', '2', '3', '4', '5', '6'];

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="booking-modal-header">
          <div>
            <h2>Book Room {room.number}</h2>
            <p className="room-location">{room.building}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-modal-form">

          {/* Teacher Info */}
          <div className="modal-form-section">
            <h3>Teacher Information</h3>

            <div className="modal-form-row">
              <div className="modal-form-field">
                <label>Teacher Name</label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-form-field">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-form-field">
              <label>Expected Students</label>
              <input
                type="number"
                name="studentCount"
                value={formData.studentCount}
                onChange={handleChange}
                min="1"
                max={room.capacity}
                required
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="modal-form-section">
            <h3>Booking Schedule</h3>

            <div className="modal-form-row">

              <div className="modal-form-field">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ✅ KEEP YOUR DESIGN */}
              <div className="modal-form-field">
                <label>Start Time</label>
                <select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {startTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ STILL PRESENT (UI SAME) */}
              <div className="modal-form-field">
                <label>Duration (Hours)</label>
                <select
                  name="numberOfHours"
                  value={formData.numberOfHours}
                  onChange={handleChange}
                >
                  {hourOptions.map((h) => (
                    <option key={h} value={h}>
                      {h}h
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="modal-form-section">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Footer */}
          <div className="booking-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit"  className="submit-booking-btn">
              <Send size={18} /> Book Room
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};