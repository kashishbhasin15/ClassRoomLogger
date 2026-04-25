// import { useState } from 'react';
// import { X, Send } from 'lucide-react';
// import './RoomBookingModal.css';
// import type { Room } from '../utils/room';
// import API from "../api/api";

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
//     startTime: '9:00',
//     numberOfHours: '1',
//     description: '',
//     studentCount: ''
//   });

//   if (!room) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();

// //   try {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       alert("Please login first");
// //       return;
// //     }

// //     const res = await API.post(
// //       "/bookings",
// //       {
// //         roomNumber: room.number,
// //         buildingName: room.building,
// //         date: formData.date,

// //         // ⚠️ IMPORTANT: must match backend
// //         timeSlot: `${formData.startTime}-${formData.numberOfHours}`,

// //         teacherName: formData.teacherName,
// //         subject: formData.subject,
// //         reason: formData.description,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`, // 🔐 required
// //         },
// //       }
// //     );

// //     console.log("Booking saved:", res.data);
// //     alert("Room booking requested successfully ✅");

// //     onClose();
// //   } catch (err: any) {
// //     console.error("Booking error:", err.response?.data || err.message);
// //     alert("Booking failed ❌");
// //   }
// // };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     // ✅ FIXED TIME SLOT FORMAT
//     const startHour = parseInt(formData.startTime.split(":")[0]);
//     const duration = parseInt(formData.numberOfHours);

//     const endHour = startHour + duration;

//     const formattedTimeSlot = `${formData.startTime}-${endHour}:00`;

//     // ✅ API CALL
//     const res = await API.post(
//       "/bookings",
//       {
//         roomNumber: room?.number,
//         buildingName: room?.building,
//         date: formData.date,
//         timeSlot: formattedTimeSlot, // 🔥 IMPORTANT FIX

//         teacherName: formData.teacherName,
//         subject: formData.subject,
//         reason: formData.description,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Booking saved:", res.data);

//     alert("Room booking requested successfully ✅");

//     onClose();

//   } catch (err: any) {
//     console.error("Booking error:", err.response?.data || err.message);
//     alert("Booking failed ❌");
//   }
// };

//   const timeOptions = [
//     '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
//     '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
//     '3:00', '3:30', '4:00', '4:30', '5:00'
//   ];

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
//           <div className="modal-form-section">
//             <h3>Teacher Information</h3>

//             <div className="modal-form-row">
//               <div className="modal-form-field">
//                 <label htmlFor="teacherName">Teacher Name</label>
//                 <input
//                   type="text"
//                   id="teacherName"
//                   name="teacherName"
//                   value={formData.teacherName}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>

//               <div className="modal-form-field">
//                 <label htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder="Enter subject"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="modal-form-field">
//               <label htmlFor="studentCount">Expected Number of Students</label>
//               <input
//                 type="number"
//                 id="studentCount"
//                 name="studentCount"
//                 value={formData.studentCount}
//                 onChange={handleChange}
//                 placeholder="e.g., 40"
//                 max={room.capacity}
//                 min="1"
//                 required
//               />
//               <small className="capacity-info">Room capacity: {room.capacity}</small>
//             </div>
//           </div>

//           <div className="modal-form-section">
//             <h3>Booking Schedule</h3>

//             <div className="modal-form-row">
//               <div className="modal-form-field">
//                 <label htmlFor="date">Date</label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="modal-form-field">
//                 <label htmlFor="startTime">Start Time</label>
//                 <select
//                   id="startTime"
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   required
//                 >
//                   {timeOptions.map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="modal-form-field">
//                 <label htmlFor="numberOfHours">Duration (Hours)</label>
//                 <select
//                   id="numberOfHours"
//                   name="numberOfHours"
//                   value={formData.numberOfHours}
//                   onChange={handleChange}
//                   required
//                 >
//                   {hourOptions.map((hours) => (
//                     <option key={hours} value={hours}>
//                       {hours}h
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="modal-form-section">
//             <label htmlFor="description">Purpose/Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe the class or activity"
//               rows={4}
//               required
//             />
//           </div>

//           <div className="booking-modal-footer">
//             <button type="button" className="cancel-btn" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="submit-booking-btn">
//               <Send size={18} />
//               Book Room
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };














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
//     timeSlot: '', // ✅ SINGLE SLOT
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

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   try {
//   //     const token = localStorage.getItem("token");

//   //     if (!token) {
//   //       alert("Please login first");
//   //       return;
//   //     }

//   //     const res = await API.post(
//   //       "/bookings",
//   //       {
//   //         roomNumber: room.number,
//   //         buildingName: room.building,
//   //         date: formData.date,
//   //         timeSlot: formData.timeSlot, // ✅ EXACT SLOT

//   //         teacherName: formData.teacherName,
//   //         subject: formData.subject,
//   //         reason: formData.description,
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     alert("Room booking requested successfully ✅");
//   //     onClose();

//   //   } catch (err: any) {
//   //     console.error(err);
//   //     alert("Booking failed ❌");
//   //   }
//   // };



//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     await API.post(
//       "/bookings",
//       {
//         roomNumber: room?.number,
//         buildingName: room?.building,
//         date: formData.date,
//         timeSlot: formData.timeSlot,
//         teacherName: formData.teacherName,
//         subject: formData.subject,
//         reason: formData.description,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     alert("Room booking requested successfully ✅");
//     onClose();

//   } catch (err: any) {
//     console.error(err);
//     alert("Booking failed ❌");
//   }
// };

//   return (
//     <div className="booking-modal-overlay" onClick={onClose}>
//       <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>

//         <div className="booking-modal-header">
//           <h2>Book Room {room.number}</h2>
//           <button onClick={onClose}>
//             <X />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="teacherName"
//             placeholder="Teacher Name"
//             value={formData.teacherName}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             value={formData.subject}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="number"
//             name="studentCount"
//             placeholder="Students"
//             value={formData.studentCount}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />

//           {/* ✅ SLOT DROPDOWN */}
//           <select
//             name="timeSlot"
//             value={formData.timeSlot}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Time Slot</option>
//             {timeSlots.map((slot) => (
//               <option key={slot} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">
//             <Send /> Book Room
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };


















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