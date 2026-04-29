import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { QRScanner } from '../components/QRScanner';
import { RoomAvailability } from '../components/RoomAvailability';
import { Send, ChevronDown, ChevronUp } from 'lucide-react';
import './ComplaintForm.css';
import API from "../api/api";
import type { Room } from "../utils/room";


export const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    building: '',
    complaintType: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '9:00-10:00',
    urgency: ''
  });

  const [showQR, setShowQR] = useState(false);
  const [showRoomAvailability, setShowRoomAvailability] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/complaints", {
        roomNumber: formData.roomNumber,
        buildingName: formData.building,       
        complaintType: formData.complaintType,
        urgencyLevel: formData.urgency,        
        date: formData.date,
        timeSlot: formData.timeSlot,
        description: formData.description,
      });

      alert("Complaint submitted successfully ✅");

      // reset form
      setFormData({
        roomNumber: '',
        building: '',
        complaintType: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        timeSlot: '9:00-10:00',
        urgency: ''
      });

    } catch (err) {
      console.error(err);
      alert("Error submitting complaint ❌");
    }
  };

  const handleQRScan = (result: { roomNumber: string; building: string }) => {
    setFormData({
      ...formData,
      roomNumber: result.roomNumber,
      building: result.building
    });
    setShowQR(false);
  };

  const handleRoomSelect = (room: Room) => {
    setFormData({
      ...formData,
      roomNumber: room.number,
      building: room.building
    });
    setShowRoomAvailability(false);
  };

  const timeSlots = [
  "8:00-8:50",
  "8:50-9:40",
  "9:40-10:30",
  "10:30-11:20",
  "11:20-12:10",
  "12:10-1:00",
  "1:00-1:50",
  "1:50-2:40",
  "2:40-3:30",
  "3:30-4:20",
  "4:20-5:10"
];

  return (
    <div className="complaint-layout">
      <Sidebar />
      <div className="complaint-main">
        <Navbar />
        <div className="complaint-content">
          <h2 className="page-title">Submit New Complaint</h2>

          {showQR && (
            <div className="component-section">
              <div className="section-header">
                <h3>Room Information via QR Code</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowQR(false)}
                >
                  Close
                </button>
              </div>
              <QRScanner onScanResult={handleQRScan} />
            </div>
          )}
          {showRoomAvailability ? (
  <div className="component-section">
    <div className="section-header">
      <h3>Select Room</h3>
      <button
        className="close-btn"
        onClick={() => setShowRoomAvailability(false)}
      >
        Close
      </button>
    </div>

    <RoomAvailability onRoomSelect={handleRoomSelect} />
  </div>
) : (
  <div className="form-card">
    <form onSubmit={handleSubmit} className="complaint-form">

      {/* ROOM SECTION */}
      <div className="room-selection-section">
        <h3>Room Information</h3>

        <div className="room-selection-buttons">
          <button
            type="button"
            className="action-btn qr-btn"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            Scan QR Code
          </button>

          <button
            type="button"
            className="action-btn availability-btn"
            onClick={() => setShowRoomAvailability(true)}
          >
            View Room Availability
          </button>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="roomNumber">Room Number</label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
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
              required
            />
          </div>
        </div>
      </div>

      {/* COMPLAINT TYPE */}
      <div className="form-row">
        <div className="form-field">
          <label>Complaint Type</label>
          <select
            name="complaintType"
            value={formData.complaintType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="projector">Projector</option>
            <option value="ac">AC</option>
            <option value="lights">Lights</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-field">
          <label>Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* DATE + TIME */}
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
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            required
          >
            {timeSlots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="form-field">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      {/* SUBMIT */}
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          <Send size={20} />
          Submit Complaint
        </button>
      </div>

       </form>
      </div>
      )};
</div>
</div>
</div>
)};