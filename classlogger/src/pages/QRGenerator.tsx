


import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { QrCode, Download, Type } from "lucide-react";
import { generateQR } from "../utils/generateQR";
import "./QRGenerator.css";

export const QRGenerator = () => {
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState("");
  const [qr, setQR] = useState("");

  const handleGenerate = async () => {
    if (!room || !building) {
      alert("Please enter both Room Number and Building Name");
      return;
    }

    const qrCode = await generateQR(room, building);
    setQR(qrCode);
  };

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-main">
        <Navbar />
        
        <div className="admin-dashboard-content">
          <div className="admin-header">
            <h2 className="page-title">QR Code Generator</h2>
          </div>

          <div className="qr-gen-container">
            {/* Input Card */}
            <div className="admin-card qr-input-card">
              <div className="qr-header-small">
                <Type size={20} className="icon-blue" />
                <span>Room Details</span>
              </div>
              
              <div className="form-group">
                <label>Room Number</label>
                <input
                  type="text"
                  placeholder="e.g. 101, Lab-01"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Building Name</label>
                <input
                  type="text"
                  placeholder="e.g. Science Block"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                />
              </div>

              <button className="generate-btn" onClick={handleGenerate}>
                <QrCode size={18} />
                Generate QR Code
              </button>
            </div>

            {/* Preview Card */}
            <div className="admin-card qr-preview-card">
              <div className="qr-header-small">
                <QrCode size={20} className="icon-blue" />
                <span>Live Preview</span>
              </div>

              <div className="qr-display-area">
                {qr ? (
                  <div className="qr-result-wrapper">
                    <img src={qr} alt="Generated QR" className="generated-image" />
                    <p className="qr-meta">Room: {room} | {building}</p>
                    <a 
                      href={qr} 
                      download={`room-${room}.png`} 
                      className="download-link"
                    >
                      <Download size={18} />
                      Download PNG
                    </a>
                  </div>
                ) : (
                  <div className="qr-placeholder">
                    <QrCode size={64} />
                    <p>Enter details to generate code</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};