import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Send } from 'lucide-react';
import './RoomBookingForm.css';

export const RoomBookingForm = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    subject: '',
    roomNumber: '',
    building: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '9:00',
    numberOfHours: '1',
    description: '',
    studentCount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Room booking submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const timeOptions = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
    '3:00', '3:30', '4:00', '4:30', '5:00'
  ];

  const hourOptions = ['1', '2', '3', '4', '5', '6'];

  return (
    <div className="booking-layout">
      <Sidebar />
      <div className="booking-main">
        <Navbar />
        <div className="booking-content">
          <h2 className="page-title">Book a Room</h2>

          <div className="booking-card">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-section">
                <h3>Teacher Information</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="teacherName">Teacher Name</label>
                    <input
                      type="text"
                      id="teacherName"
                      name="teacherName"
                      value={formData.teacherName}
                      onChange={handleChange}
                      placeholder="Enter teacher name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject name"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="studentCount">Expected Number of Students</label>
                  <input
                    type="number"
                    id="studentCount"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    placeholder="e.g., 40"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Room Selection</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      type="text"
                      id="roomNumber"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      placeholder="e.g., 101 or Lab-01"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="building">Building Name</label>
                    <input
                      type="text"
                      id="building"
                      name="building"
                      value={formData.building}
                      onChange={handleChange}
                      placeholder="e.g., Building A"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Booking Schedule</h3>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="startTime">Start Time</label>
                    <select
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="numberOfHours">Duration (Hours)</label>
                    <select
                      id="numberOfHours"
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

              <div className="form-section">
                <h3>Additional Information</h3>

                <div className="form-field">
                  <label htmlFor="description">Purpose/Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide details about the class or activity"
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
