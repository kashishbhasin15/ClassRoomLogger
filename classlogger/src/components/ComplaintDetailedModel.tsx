// import { X, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
// import './ComplaintDetailedModel.css';

// interface Complaint {
//   id: string;
//   title: string;
//   student: string;
//   location: string;
//   date: string;
//   status: 'pending' | 'in_progress' | 'resolved';
//   description: string;
//   complaintType: string;
//   urgency: string;
//   timeSlot: string;
// }

// interface ComplaintDetailModalProps {
//   complaint: Complaint | null;
//   onClose: () => void;
// }

// export const ComplaintDetailModal = ({ complaint, onClose }: ComplaintDetailModalProps) => {
//   if (!complaint) return null;

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return 'pending';
//       case 'in_progress':
//         return 'progress';
//       case 'resolved':
//         return 'resolved';
//       default:
//         return '';
//     }
//   };

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case 'low':
//         return 'urgency-low';
//       case 'medium':
//         return 'urgency-medium';
//       case 'high':
//         return 'urgency-high';
//       case 'urgent':
//         return 'urgency-urgent';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{complaint.title}</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="complaint-grid">
//             <div className="grid-item">
//               <label>Complaint ID</label>
//               <p>#{complaint.id}</p>
//             </div>

//             <div className="grid-item">
//               <label>Reported By</label>
//               <p>{complaint.student}</p>
//             </div>

//             <div className="grid-item">
//               <label>Status</label>
//               <span className={`status-badge ${getStatusColor(complaint.status)}`}>
//                 {complaint.status === 'in_progress' ? 'In Progress' : complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
//               </span>
//             </div>

//             <div className="grid-item">
//               <label>Urgency Level</label>
//               <span className={`urgency-badge ${getUrgencyColor(complaint.urgency)}`}>
//                 {complaint.urgency.charAt(0).toUpperCase() + complaint.urgency.slice(1)}
//               </span>
//             </div>

//             <div className="grid-item">
//               <label>Complaint Type</label>
//               <p>{complaint.complaintType.charAt(0).toUpperCase() + complaint.complaintType.slice(1)}</p>
//             </div>

//             <div className="grid-item">
//               <label>Location</label>
//               <div className="location-info">
//                 <MapPin size={16} />
//                 <p>{complaint.location}</p>
//               </div>
//             </div>

//             <div className="grid-item">
//               <label>Date</label>
//               <div className="date-info">
//                 <Calendar size={16} />
//                 <p>{complaint.date}</p>
//               </div>
//             </div>

//             <div className="grid-item">
//               <label>Time Slot</label>
//               <div className="time-info">
//                 <Clock size={16} />
//                 <p>{complaint.timeSlot}</p>
//               </div>
//             </div>
//           </div>

//           <div className="description-section">
//             <div className="description-header">
//               <AlertCircle size={20} />
//               <label>Detailed Description</label>
//             </div>
//             <div className="description-content">
//               {complaint.description}
//             </div>
//           </div>
//         </div>

//         <div className="modal-footer">
//           <button className="action-btn close-modal-btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };







import { X, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import './ComplaintDetailedModel.css';

interface Complaint {
  _id: string;
  complaintType?: string;
  createdBy?: { name?: string };
  roomNumber?: string;
  buildingName?: string;
  createdAt?: string;
  status?: 'pending' | 'in_progress' | 'resolved';
  description?: string;
  urgency?: string;
  timeSlot?: string;
}

interface Props {
  complaint: Complaint | null;
  onClose: () => void;
}

export const ComplaintDetailModal = ({ complaint, onClose }: Props) => {
  if (!complaint) return null;

  const formatText = (text?: string) => {
    if (!text) return "N/A";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>{complaint.complaintType || "Complaint"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="complaint-grid">

            <div className="grid-item">
              <label>ID</label>
              <p>#{complaint._id?.slice(-4)}</p>
            </div>

            <div className="grid-item">
              <label>Student</label>
              <p>{complaint.createdBy?.name || "User"}</p>
            </div>

            <div className="grid-item">
              <label>Status</label>
              <span className={`status-badge ${complaint.status}`}>
                {formatText(complaint.status)}
              </span>
            </div>

            <div className="grid-item">
              <label>Urgency</label>
              <span className="urgency-badge">
                {formatText(complaint.urgency)}
              </span>
            </div>

            <div className="grid-item">
              <label>Type</label>
              <p>{formatText(complaint.complaintType)}</p>
            </div>

            <div className="grid-item">
              <label>Location</label>
              <div>
                <MapPin size={16} />
                <p>
                  {complaint.roomNumber} - {complaint.buildingName}
                </p>
              </div>
            </div>

            <div className="grid-item">
              <label>Date</label>
              <div>
                <Calendar size={16} />
                <p>
                  {complaint.createdAt
                    ? new Date(complaint.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="grid-item">
              <label>Time Slot</label>
              <div>
                <Clock size={16} />
                <p>{complaint.timeSlot || "N/A"}</p>
              </div>
            </div>

          </div>

          <div className="description-section">
            <div className="description-header">
              <AlertCircle size={20} />
              <label>Description</label>
            </div>

            <div className="description-content">
              {complaint.description || "No description provided"}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};