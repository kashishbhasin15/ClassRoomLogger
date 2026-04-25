import QRCode from "qrcode";

export const generateQR = async (roomNumber: string, building: string) => {
  const data = JSON.stringify({
    roomNumber,
    building,
  });

  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error(err);
    return "";
  }
};