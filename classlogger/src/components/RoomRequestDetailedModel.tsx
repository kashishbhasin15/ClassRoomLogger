import { X, MapPin, Clock, BookOpen, FileText } from "lucide-react";
import "./ComplaintDetailedModel.css"; // reuse same styling

interface Booking {
  _id: string;
  roomNumber?: string;
  buildingName?: string;
  timeSlot?: string;
  teacherName?: string;
  subject?: string;
  reason?: string;
  status?: string;
}

interface Props {
  request: Booking | null;
  onClose: () => void;
}

export const RoomRequestDetailModal = ({ request, onClose }: Props) => {
  if (!request) return null;

  const format = (text?: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "N/A";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Room Request</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <div className="complaint-grid">

            <div className="grid-item">
              <label>ID</label>
              <p>#{request._id?.slice(-4)}</p>
            </div>

            <div className="grid-item">
              <label>Teacher</label>
              <p>{request.teacherName || "N/A"}</p>
            </div>

            <div className="grid-item">
              <label>Status</label>
              <span className={`status-badge ${request.status}`}>
                {format(request.status)}
              </span>
            </div>

            <div className="grid-item">
              <label>Room</label>
              <div>
                <MapPin size={16} />
                <p>{request.roomNumber} - {request.buildingName}</p>
              </div>
            </div>

            <div className="grid-item">
              <label>Time Slot</label>
              <div>
                <Clock size={16} />
                <p>{request.timeSlot || "N/A"}</p>
              </div>
            </div>

            <div className="grid-item">
              <label>Subject</label>
              <div>
                <BookOpen size={16} />
                <p>{request.subject || "N/A"}</p>
              </div>
            </div>

          </div>

          <div className="description-section">
            <div className="description-header">
              <FileText size={20} />
              <label>Reason</label>
            </div>

            <div className="description-content">
              {request.reason || "No reason provided"}
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