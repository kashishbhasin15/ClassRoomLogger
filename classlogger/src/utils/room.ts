
export interface Room {
  id: string;
  number: string;
  building: string;
  capacity: number;
}

// ✅ TYPE ROOMS ARRAY
export const generateRooms = (): Room[] => {
  const rooms: Room[] = [];

  const blocks = ["A", "B", "C"];

  blocks.forEach((block) => {
    for (let floor = 1; floor <= 2; floor++) {
      for (let i = 1; i <= 4; i++) {
        rooms.push({
          id: `${block}-${floor}-${i}`,
          number: `${floor}${i}`,
          building: `Block ${block}`,
          capacity: 150,
        });
      }
    }
  });

  return rooms;
};
