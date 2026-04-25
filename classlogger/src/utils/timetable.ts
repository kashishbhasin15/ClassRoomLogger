export const timeSlots = [
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

export const isAutoBooked = (roomNumber: string, timeSlot: string) => {
  if (roomNumber === "11" && timeSlot === "8:00-8:50") return true;
  if (roomNumber === "21" && timeSlot === "3:30-4:20") return true;
  return false;
};