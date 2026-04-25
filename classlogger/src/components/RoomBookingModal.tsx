


// import { useState } from 'react';
// import { X, Send } from 'lucide-react';
// import './RoomBookingModal.css';
// import type { Room } from '../utils/room';
// import API from "../api/api";
// import { timeSlots } from "../utils/timetable";

// interface RoomBookingModalProps {
//   room: Room | null;
//   onClose: () => void;
//   date: string;
//   timeSlot: string;
// }

// export const RoomBookingModal = ({ room, onClose }: RoomBookingModalProps) => {

//   const [formData, setFormData] = useState({
//     teacherName: '',
//     subject: '',
//     date: new Date().toISOString().split('T')[0],
//     startTime: '',          // ✅ keep original
//     numberOfHours: '1',     // ✅ keep original
//     description: '',
//     studentCount: ''
//   });

//   if (!room) return null;

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ✅ MAP START TIME → SLOT
//   const getTimeSlotFromStart = (startTime: string) => {
//     const slot = timeSlots.find((s) => s.startsWith(startTime));
//     return slot || "";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       const slot = getTimeSlotFromStart(formData.startTime);

//       if (!slot) {
//         alert("Please select a valid start time");
//         return;
//       }

//       await API.post(
//         "/bookings",
//         {
//           roomNumber: room?.number,
//           buildingName: room?.building,
//           date: formData.date,
//           timeSlot: slot, // ✅ FIXED SLOT

//           teacherName: formData.teacherName,
//           subject: formData.subject,
//           reason: formData.description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Room booking requested successfully ✅");
//       onClose();

//     } catch (err: any) {
//       console.error(err);
//       alert("Booking failed ❌");
//     }
//   };

//   // ✅ START TIME OPTIONS FROM YOUR SLOTS
//   const startTimeOptions = timeSlots.map(slot => slot.split("-")[0]);

//   const hourOptions = ['1', '2', '3', '4', '5', '6'];

//   return (
//     <div className="booking-modal-overlay" onClick={onClose}>
//       <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        
//         <div className="booking-modal-header">
//           <div>
//             <h2>Book Room {room.number}</h2>
//             <p className="room-location">{room.building}</p>
//           </div>
//           <button className="close-btn" onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="booking-modal-form">

//           {/* Teacher Info */}
//           <div className="modal-form-section">
//             <h3>Teacher Information</h3>

//             <div className="modal-form-row">
//               <div className="modal-form-field">
//                 <label>Teacher Name</label>
//                 <input
//                   type="text"
//                   name="teacherName"
//                   value={formData.teacherName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="modal-form-field">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="modal-form-field">
//               <label>Expected Students</label>
//               <input
//                 type="number"
//                 name="studentCount"
//                 value={formData.studentCount}
//                 onChange={handleChange}
//                 min="1"
//                 max={room.capacity}
//                 required
//               />
//             </div>
//           </div>

//           {/* Schedule */}
//           <div className="modal-form-section">
//             <h3>Booking Schedule</h3>

//             <div className="modal-form-row">

//               <div className="modal-form-field">
//                 <label>Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* ✅ KEEP YOUR DESIGN */}
//               <div className="modal-form-field">
//                 <label>Start Time</label>
//                 <select
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select</option>
//                   {startTimeOptions.map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* ✅ STILL PRESENT (UI SAME) */}
//               <div className="modal-form-field">
//                 <label>Duration (Hours)</label>
//                 <select
//                   name="numberOfHours"
//                   value={formData.numberOfHours}
//                   onChange={handleChange}
//                 >
//                   {hourOptions.map((h) => (
//                     <option key={h} value={h}>
//                       {h}h
//                     </option>
//                   ))}
//                 </select>
//               </div>

//             </div>
//           </div>

//           {/* Description */}
//           <div className="modal-form-section">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Footer */}
//           <div className="booking-modal-footer">
//             <button type="button" className="cancel-btn" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit"  className="submit-booking-btn">
//               <Send size={18} /> Book Room
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };










import { useState } from "react";
import { X } from "lucide-react";
import "./RoomBookingModal.css";
import API from "../api/api";

interface Room {
  number: string;
  building: string;
  capacity: number;
}

interface Props {
  room: Room;
  date: string;
  timeSlot: string; // 🔥 comes from RoomAvailability
  onClose: () => void;
}

export const RoomBookingModal = ({
  room,
  date,
  timeSlot,
  onClose,
}: Props) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
    date: date,
    startTime: timeSlot, // ✅ AUTO FILLED
    numberOfHours: "1",
    description: "",
    studentCount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          roomNumber: room.number,
          buildingName: room.building,
          date: formData.date,
          timeSlot: formData.startTime, // 🔥 same slot
          teacherName: formData.teacherName,
          subject: formData.subject,
          studentCount: formData.studentCount,
          description: formData.description,
          numberOfHours: formData.numberOfHours,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Room booked successfully!");
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">

        {/* HEADER */}
        <div className="booking-modal-header">
          <div>
            <h2>Book Room {room.number}</h2>
            <p className="room-location">{room.building}</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form className="booking-modal-form" onSubmit={handleSubmit}>

          {/* INFO */}
          <div className="modal-form-section">
            <h3>Room Info</h3>

            <div className="modal-form-row">
              <div className="modal-form-field">
                <label>Date</label>
                <input type="text" value={formData.date} readOnly />
              </div>

              <div className="modal-form-field">
                <label>Time Slot</label>
                {/* 🔥 AUTO-FILLED + LOCKED */}
                <input type="text" value={formData.startTime} readOnly />
              </div>
            </div>

            <p className="capacity-info">
              Capacity: {room.capacity}
            </p>
          </div>

          {/* TEACHER INFO */}
          <div className="modal-form-section">
            <h3>Teacher Details</h3>

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
              <label>Number of Students</label>
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

          {/* EXTRA */}
          <div className="modal-form-section">
            <h3>Additional Info</h3>

            <div className="modal-form-field">
              <label>Duration (Hours)</label>
              <select
                name="numberOfHours"
                value={formData.numberOfHours}
                onChange={handleChange}
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
              </select>
            </div>

            <div className="modal-form-field">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="booking-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit-booking-btn">
              Confirm Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};