import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Send } from 'lucide-react';
import './RoomBookingForm.css';

// 🔥 IMPORT YOUR TIME SLOTS
import { timeSlots, isAutoBooked } from '../utils/timetable';

export const RoomBookingForm = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    roomNumber: '',
    building: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    numberOfHours: '1',
    description: '',
    studentCount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Room booking submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const hourOptions = ['1', '2', '3', '4', '5', '6'];

  // 🔥 CONVERT "8:00-8:50" → start minutes
  const getStartMinutes = (slot: string) => {
    const start = slot.split("-")[0];
    let [hours, minutes] = start.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // 🔥 FILTER TIME SLOTS (CURRENT TIME + AUTO BOOKED)
  const getFilteredTimeSlots = () => {
    const now = new Date();
    const selectedDate = new Date(formData.date);

    const isToday =
      now.toDateString() === selectedDate.toDateString();

    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();

    return timeSlots.filter((slot) => {
      // ❌ remove auto-booked
      if (isAutoBooked(formData.roomNumber, slot)) return false;

      // ✅ if not today → allow all
      if (!isToday) return true;

      // ❌ remove past slots
      return getStartMinutes(slot) > currentMinutes;
    });
  };

  // 🔥 AUTO FIX START TIME
  useEffect(() => {
    const filtered = getFilteredTimeSlots();

    if (!filtered.includes(formData.startTime)) {
      setFormData((prev) => ({
        ...prev,
        startTime: filtered[0] || ""
      }));
    }
  }, [formData.date, formData.roomNumber]);

  return (
    <div className="booking-layout">
      <Sidebar />
      <div className="booking-main">
        <Navbar />
        <div className="booking-content">
          <h2 className="page-title">Book a Room</h2>

          <div className="booking-card">
            <form onSubmit={handleSubmit} className="booking-form">

              {/* Teacher Section */}
              <div className="form-section">
                <h3>Teacher Information</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label>Teacher Name</label>
                    <input
                      type="text"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
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

                <div className="form-field">
                  <label>Expected Number of Students</label>
                  <input
                    type="number"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Room Section */}
              <div className="form-section">
                <h3>Room Selection</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label>Room Number</label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Building Name</label>
                    <input
                      type="text"
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="form-section">
                <h3>Booking Schedule</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Time Slot</label>
                    <select
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                    >
                      {getFilteredTimeSlots().length === 0 ? (
                        <option disabled>No slots available</option>
                      ) : (
                        getFilteredTimeSlots().map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Duration (Hours)</label>
                    <select
                      name="numberOfHours"
                      value={formData.numberOfHours}
                      onChange={handleChange}
                      required
                    >
                      {hourOptions.map((hours) => (
                        <option key={hours} value={hours}>
                          {hours} Hour{hours !== '1' ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="form-section">
                <h3>Additional Information</h3>

                <div className="form-field">
                  <label>Purpose/Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <Send size={20} />
                  Submit Room Booking
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
