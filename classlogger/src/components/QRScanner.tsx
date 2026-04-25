
import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, AlertCircle } from 'lucide-react';
import './QRScanner.css'; // ✅ Your original CSS remains applied

interface QRScanResult {
  roomNumber: string;
  building: string;
}

interface QRScannerProps {
  onScanResult?: (result: QRScanResult) => void;
}

export const QRScanner = ({ onScanResult }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<QRScanResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Only start the library if isScanning is true and we don't have data yet
    if (!isScanning || scannedData) return;

    const scanner = new Html5Qrcode("reader");

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          try {
            const parsed = JSON.parse(decodedText);

            // Validation from your new code
            if (!parsed.roomNumber || !parsed.building) {
              throw new Error("Invalid Format");
            }

            const result = {
              roomNumber: parsed.roomNumber,
              building: parsed.building,
            };

            setScannedData(result);
            setIsScanning(false);
            
            if (onScanResult) {
              onScanResult(result);
            }

            scanner.stop();
          } catch (err) {
            setError("Invalid QR format ❌");
          }
        },
        () => {} // Silent failure for frame-by-frame scanning
      )
      .catch(() => {
        setError("Camera permission denied ❌");
        setIsScanning(false);
      });

    // Cleanup: Stop camera when component unmounts or scanning stops
    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(() => {});
      }
    };
  }, [isScanning, scannedData, onScanResult]);

  const handleClear = () => {
    setScannedData(null);
    setError("");
    setIsScanning(false);
  };

  return (
    <div className="qr-scanner">
      <div className="scanner-header">
        <div className="scanner-icon">
          <QrCode size={32} />
        </div>
        <h3>QR Code Scanner</h3>
      </div>

      {!scannedData ? (
        <>
          <div className="scanner-preview">
            {isScanning ? (
              /* ✅ The library will inject the video feed into this ID */
              <div id="reader" style={{ width: "100%", height: "100%" }} />
            ) : (
              <div className="scanner-placeholder">
                <QrCode size={48} />
                <p>Point camera at QR code to scan</p>
              </div>
            )}
            
            {/* Keeping your scan line animation overlay if isScanning is true */}
            {isScanning && (
              <div className="scanning-animation" style={{ pointerEvents: 'none' }}>
                <div className="scan-line"></div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => { setError(""); setIsScanning(true); }}
              disabled={isScanning}
              className="scan-button"
            >
              {isScanning ? 'Camera Active' : '📷 Start QR Scan'}
            </button>

            {/* Google Lens fallback from your new code */}
            {/* {!isScanning && (
              <button 
                onClick={() => window.open("https://lens.google.com/", "_blank")}
                className="clear-button"
                style={{ border: '1px solid #ddd' }}
              >
                🔍 Use Google Lens
              </button>
            )} */}
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <p className="manual-input-note">
            No QR code? You can manually enter room details below.
          </p>
        </>
      ) : (
        /* ✅ Matches your original Success UI */
        <div className="scan-result">
          <div className="result-icon">
            <QrCode size={24} />
          </div>
          <div className="result-details">
            <p className="result-label">QR Scan Successful</p>
            <p className="result-room">Room {scannedData.roomNumber}</p>
            <p className="result-building">{scannedData.building}</p>
          </div>
          <button onClick={handleClear} className="clear-button">
            Rescan
          </button>
        </div>
      )}
    </div>
  );
};