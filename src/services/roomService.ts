import { Room } from '../types';

// Mock data for rooms
const roomsData: Room[] = [
  {
    id: 'room-1',
    name: 'Chambre Standard',
    type: 'standard',
    description: 'Une chambre confortable et élégante pour votre séjour à Paris.',
    longDescription: 'Profitez d\'un séjour paisible dans notre chambre standard, meublée avec goût et offrant tout le confort nécessaire pour votre séjour. Dotée d\'une literie de qualité, d\'une salle de bain moderne et d\'une vue agréable sur la ville, cette chambre est idéale pour les voyageurs d\'affaires ou les touristes souhaitant explorer Paris.',
    pricePerNight: 150,
    capacity: 2,
    size: 25,
    amenities: ['wifi', 'tv', 'bathroom'],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg'
    ],
    status: 'available'
  },
  {
    id: 'room-2',
    name: 'Chambre Deluxe',
    type: 'deluxe',
    description: 'Une chambre spacieuse avec vue panoramique sur la ville.',
    longDescription: 'Notre chambre Deluxe offre un espace généreux et une décoration raffinée. Admirez la vue panoramique sur Paris depuis votre fenêtre et profitez d\'équipements haut de gamme, dont une grande salle de bain en marbre avec baignoire et douche à l\'italienne. Le lit king-size avec matelas premium vous garantit un sommeil réparateur.',
    pricePerNight: 250,
    capacity: 2,
    size: 35,
    amenities: ['wifi', 'tv', 'bathroom', 'minibar', 'roomService'],
    images: [
      'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg',
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    ],
    status: 'available'
  },
  {
    id: 'room-3',
    name: 'Suite Junior',
    type: 'suite',
    description: 'Une élégante suite avec salon séparé et vue sur le jardin.',
    longDescription: 'Découvrez le luxe et l\'élégance dans notre Suite Junior, composée d\'une chambre spacieuse et d\'un salon séparé parfait pour se détendre. La décoration contemporaine et les matériaux nobles créent une atmosphère chaleureuse et sophistiquée. Profitez d\'une vue apaisante sur notre jardin privé, d\'un minibar garni et d\'un service en chambre 24h/24.',
    pricePerNight: 350,
    capacity: 3,
    size: 45,
    amenities: ['wifi', 'tv', 'bathroom', 'minibar', 'roomService', 'breakfast'],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg'
    ],
    status: 'available'
  },
  {
    id: 'room-4',
    name: 'Suite Exécutive',
    type: 'suite',
    description: 'Une suite luxueuse avec chambre, salon et salle à manger séparés.',
    longDescription: 'Notre Suite Exécutive représente le summum du luxe, avec une superficie généreuse divisée en espaces distincts : chambre principale avec lit king-size, salon élégant et coin salle à manger pour vos repas privés. La suite dispose d\'une grande terrasse offrant une vue imprenable sur les monuments parisiens, d\'une salle de bain en marbre avec jacuzzi et douche à effet pluie.',
    pricePerNight: 450,
    capacity: 2,
    size: 60,
    amenities: ['wifi', 'tv', 'bathroom', 'minibar', 'roomService', 'breakfast', 'phone'],
    images: [
      'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
      'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg'
    ],
    status: 'available'
  },
  {
    id: 'room-5',
    name: 'Suite Familiale',
    type: 'family',
    description: 'Une suite spacieuse idéale pour les familles avec enfants.',
    longDescription: 'Parfaite pour des vacances en famille, notre Suite Familiale comprend une chambre parentale avec lit king-size et une chambre séparée avec deux lits simples pour les enfants. L\'espace salon permet de se retrouver confortablement, tandis que la salle de bain familiale est équipée d\'une baignoire et d\'une douche. Des jeux et équipements pour enfants sont disponibles sur demande.',
    pricePerNight: 380,
    capacity: 4,
    size: 65,
    amenities: ['wifi', 'tv', 'bathroom', 'breakfast', 'phone'],
    images: [
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg'
    ],
    status: 'available'
  },
  {
    id: 'room-6',
    name: 'Suite Présidentielle',
    type: 'suite',
    description: 'Notre suite la plus luxueuse avec vue panoramique sur la ville.',
    longDescription: 'La Suite Présidentielle incarne l\'élégance parisienne dans sa forme la plus exquise. Avec ses 90m², elle offre un espace de vie exceptionnel : vaste chambre avec lit king-size ultra-premium, salon somptueux, salle à manger pour 6 personnes et bureau privé. La salle de bain en marbre dispose d\'un hammam privé et d\'une baignoire jacuzzi. Un majordome personnel est à votre disposition 24h/24.',
    pricePerNight: 950,
    capacity: 2,
    size: 90,
    amenities: ['wifi', 'tv', 'bathroom', 'minibar', 'roomService', 'breakfast', 'phone'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg',
      'https://images.pexels.com/photos/3754595/pexels-photo-3754595.jpeg'
    ],
    status: 'unavailable'
  }
];

// Simulated API call to fetch rooms
export const fetchRooms = async (): Promise<Room[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return roomsData;
};

// Simulated API call to fetch a single room
export const fetchRoom = async (id: string): Promise<Room | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return roomsData.find(room => room.id === id);
};

// Simulated API call to delete a room
export const deleteRoom = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would make an API call to delete the room
  console.log(`Room with ID ${id} deleted`);
};

// Simulated API call to check room availability
export const checkRoomAvailability = async (
  roomId: string, 
  checkIn: string, 
  checkOut: string
): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would check against actual bookings
  // Here we'll just return a random result for demo purposes
  return Math.random() > 0.3; // 70% chance of being available
};