const mockLocations = [
  { 
    id: 1, 
    name: 'NHIF Office', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.775, 39.209], 
    desc: 'Student health insurance office.',
    detailedDesc: 'The National Health Insurance Fund (NHIF) office at UDSM provides comprehensive health insurance services for all registered students. Services include registration, claims processing, and health card renewals.',
    wifi: false, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    reviews: [
      { id: 1, name: 'John Michael', avatar: 'https://i.pravatar.cc/150?img=1', rating: 4, comment: 'Quick service when there are few people. Staff are helpful.', date: '2026-01-15' },
      { id: 2, name: 'Sarah Ahmed', avatar: 'https://i.pravatar.cc/150?img=5', rating: 3, comment: 'Long queues during peak hours. Need more counters.', date: '2026-01-10' },
      { id: 3, name: 'David Kimani', avatar: 'https://i.pravatar.cc/150?img=3', rating: 5, comment: 'Excellent service for student health concerns.', date: '2026-01-05' },
      { id: 4, name: 'Maria Charles', avatar: 'https://i.pravatar.cc/150?img=9', rating: 4, comment: 'Very convenient for on-campus students.', date: '2026-12-20' },
      { id: 5, name: 'Robert Paul', avatar: 'https://i.pravatar.cc/150?img=8', rating: 2, comment: 'Slow service. Better to come early.', date: '2026-12-15' }
    ]
  },
  { 
    id: 2, 
    name: 'Registry', 
    type: 'Admin', 
    status: 'Open', 
    coords: [-6.776, 39.208], 
    desc: 'Administration and records.',
    detailedDesc: 'The University Registry handles all academic records, transcripts, certificates, and student enrollment verification. It is the central administrative hub for all student documentation needs.',
    wifi: true, 
    ac: true, 
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 7:30 AM - 4:00 PM',
    population: 'high',
    reviews: [
      { id: 1, name: 'Emily Jackson', avatar: 'https://i.pravatar.cc/150?img=16', rating: 5, comment: 'Got my transcript within 2 days. Very efficient!', date: '2026-01-18' },
      { id: 2, name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4, comment: 'Staff are professional and helpful.', date: '2026-01-12' },
      { id: 3, name: 'Anna Mwamba', avatar: 'https://i.pravatar.cc/150?img=20', rating: 4, comment: 'Good air conditioning makes waiting comfortable.', date: '2026-01-08' },
      { id: 4, name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=11', rating: 3, comment: 'Can be crowded during exam periods.', date: '2026-01-02' },
      { id: 5, name: 'Grace Mushi', avatar: 'https://i.pravatar.cc/150?img=23', rating: 5, comment: 'Excellent customer service!', date: '2026-12-28' }
    ]
  },
  { 
    id: 3, 
    name: 'Lecture Hall 3', 
    type: 'Academic', 
    status: 'Occupied', 
    coords: [-6.774, 39.207], 
    desc: 'Main lecture theatre 3.',
    detailedDesc: 'Lecture Hall 3 is one of the largest lecture theatres on campus, seating over 300 students. Equipped with modern audio-visual equipment, air conditioning, and accessible seating.',
    wifi: true, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM',
    population: 'high',
    reviews: [
      { id: 1, name: 'Peter Ngowi', avatar: 'https://i.pravatar.cc/150?img=13', rating: 4, comment: 'Great acoustics and projector quality.', date: '2026-01-20' },
      { id: 2, name: 'Lisa Mrema', avatar: 'https://i.pravatar.cc/150?img=24', rating: 3, comment: 'Gets hot without AC during afternoon classes.', date: '2026-01-15' },
      { id: 3, name: 'Tom Harris', avatar: 'https://i.pravatar.cc/150?img=15', rating: 5, comment: 'Best lecture hall on campus!', date: '2026-01-10' },
      { id: 4, name: 'Joyce Sebastian', avatar: 'https://i.pravatar.cc/150?img=25', rating: 4, comment: 'Comfortable seating arrangements.', date: '2026-01-05' }
    ]
  },
  { 
    id: 4, 
    name: 'Old Library', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.773, 39.206], 
    desc: 'Central library with study spaces.',
    detailedDesc: 'The historic Old Library offers extensive book collections, study rooms, computer stations, and a quiet learning environment. Open to all registered students and staff.',
    wifi: true, 
    ac: true, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Sun: 8:00 AM - 10:00 PM',
    population: 'medium',
    reviews: [
      { id: 1, name: 'Catherine Rite', avatar: 'https://i.pravatar.cc/150?img=26', rating: 5, comment: 'Perfect quiet environment for studying.', date: '2026-01-22' },
      { id: 2, name: 'Andrew Masudi', avatar: 'https://i.pravatar.cc/150?img=17', rating: 5, comment: 'Extensive book collection. Love the study rooms!', date: '2026-01-18' },
      { id: 3, name: 'Rachel Gomes', avatar: 'https://i.pravatar.cc/150?img=27', rating: 4, comment: 'Great AC and WiFi. Can get crowded during exams.', date: '2026-01-14' },
      { id: 4, name: 'Samuel Juma', avatar: 'https://i.pravatar.cc/150?img=14', rating: 4, comment: 'Good lighting for late-night studies.', date: '2026-01-08' },
      { id: 5, name: 'Deborah Swai', avatar: 'https://i.pravatar.cc/150?img=28', rating: 5, comment: 'My favorite spot on campus!', date: '2026-01-03' }
    ]
  },
  { 
    id: 5, 
    name: 'Faculty of Engineering', 
    type: 'Academic', 
    status: 'Open', 
    coords: [-6.777, 39.2095], 
    desc: 'Engineering faculty building.',
    detailedDesc: 'The Faculty of Engineering houses multiple engineering departments including Civil, Electrical, Mechanical, and Computer Engineering. Features specialized labs and workshops.',
    wifi: false, 
    ac: true, 
    parking: true,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Mon-Fri: 7:00 AM - 6:00 PM',
    population: 'medium',
    reviews: [
      { id: 1, name: 'Kevin Mwakibete', avatar: 'https://i.pravatar.cc/150?img=18', rating: 5, comment: 'State-of-the-art labs and equipment!', date: '2026-01-21' },
      { id: 2, name: 'Nancy Lyimo', avatar: 'https://i.pravatar.cc/150?img=29', rating: 4, comment: 'Good study environment in the building.', date: '2026-01-16' },
      { id: 3, name: 'Brian Mushi', avatar: 'https://i.pravatar.cc/150?img=19', rating: 4, comment: 'Spacious building with good ventilation.', date: '2026-01-11' },
      { id: 4, name: 'Patricia Sanga', avatar: 'https://i.pravatar.cc/150?img=30', rating: 3, comment: 'No WiFi is a major drawback.', date: '2026-01-06' }
    ]
  },
  { 
    id: 6, 
    name: 'Bursar Office', 
    type: 'Admin', 
    status: 'Open', 
    coords: [-6.7755, 39.210], 
    desc: 'Fees and payments.',
    detailedDesc: 'The Bursar Office handles all tuition fees, accommodation payments, and financial inquiries. Students can pay fees via cash, bank transfer, or mobile money.',
    wifi: false, 
    ac: false, 
    parking: true,
    wheelchair: false,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    reviews: [
      { id: 1, name: 'Martin Lupembe', avatar: 'https://i.pravatar.cc/150?img=21', rating: 3, comment: 'Long waiting times but staff are helpful.', date: '2026-01-19' },
      { id: 2, name: 'Angel John', avatar: 'https://i.pravatar.cc/150?img=31', rating: 3, comment: 'Can be chaotic during fee payment deadlines.', date: '2026-01-13' },
      { id: 3, name: 'Francis Mtei', avatar: 'https://i.pravatar.cc/150?img=22', rating: 4, comment: 'Payment process is straightforward.', date: '2026-01-07' }
    ]
  },
  { 
    id: 7, 
    name: 'Cafeteria A', 
    type: 'Service', 
    status: 'Temporarily Closed', 
    coords: [-6.7745, 39.2085], 
    desc: 'Student dining hall.',
    detailedDesc: 'Cafeteria A offers affordable meals for students with a variety of local and international dishes. Currently undergoing renovation for improved facilities.',
    wifi: false, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: true,
    charging: false,
    openingHours: 'Mon-Sun: 6:00 AM - 9:00 PM (Currently Closed)',
    population: 'high',
    reviews: [
      { id: 1, name: 'Diana Mhina', avatar: 'https://i.pravatar.cc/150?img=32', rating: 2, comment: 'Food quality has declined recently.', date: '2026-01-17' },
      { id: 2, name: 'Joseph Mushi', avatar: 'https://i.pravatar.cc/150?img=23', rating: 3, comment: 'Good variety of local dishes.', date: '2026-01-09' },
      { id: 3, name: 'Gladness Mbise', avatar: 'https://i.pravatar.cc/150?img=33', rating: 4, comment: 'Best place for cheap eats on campus!', date: '2026-01-01' }
    ]
  },
  { 
    id: 8, 
    name: 'Computer Lab', 
    type: 'Academic', 
    status: 'Occupied', 
    coords: [-6.7735, 39.2075], 
    desc: 'Open lab for students.',
    detailedDesc: 'The Computer Lab provides 50+ workstations with high-speed internet access. Available software includes Microsoft Office, programming IDEs, and design tools.',
    wifi: true, 
    ac: true, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    population: 'medium',
    reviews: [
      { id: 1, name: 'Steven Kyaruzi', avatar: 'https://i.pravatar.cc/150?img=24', rating: 5, comment: 'Fast computers and reliable WiFi!', date: '2026-01-23' },
      { id: 2, name: 'Irene Nyerere', avatar: 'https://i.pravatar.cc/150?img=34', rating: 4, comment: 'Great for programming assignments.', date: '2026-01-17' },
      { id: 3, name: 'Daniel Mdegella', avatar: 'https://i.pravatar.cc/150?img=25', rating: 4, comment: 'Good air conditioning.', date: '2026-01-11' },
      { id: 4, name: 'Happiness Gasper', avatar: 'https://i.pravatar.cc/150?img=35', rating: 3, comment: 'Can get crowded during assignment deadlines.', date: '2026-01-05' }
    ]
  },
  { 
    id: 9, 
    name: 'Student Affairs', 
    type: 'Admin', 
    status: 'Open', 
    coords: [-6.7765, 39.2065], 
    desc: 'Support services for students.',
    detailedDesc: 'The Department of Student Affairs provides counseling services, career guidance, student clubs support, and general student welfare programs.',
    wifi: true, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    reviews: [
      { id: 1, name: 'Fatuma Hamad', avatar: 'https://i.pravatar.cc/150?img=36', rating: 5, comment: 'Very supportive counselors!', date: '2026-01-22' },
      { id: 2, name: 'Hamis Juma', avatar: 'https://i.pravatar.cc/150?img=26', rating: 4, comment: 'Helpful with student club registrations.', date: '2026-01-16' },
      { id: 3, name: 'Zainab Mbwana', avatar: 'https://i.pravatar.cc/150?img=37', rating: 5, comment: 'Great career guidance services.', date: '2026-01-10' }
    ]
  },
  { 
    id: 10, 
    name: 'Health Center', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.7758, 39.2058], 
    desc: 'On-campus clinic.',
    detailedDesc: 'The University Health Center provides medical services including first aid, consultations, basic treatments, and referrals to larger hospitals. Open to all students and staff.',
    wifi: false, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: '24/7 (Emergency), Mon-Fri: 8:00 AM - 6:00 PM (General)',
    population: 'low',
    reviews: [
      { id: 1, name: 'Dr. Amina Yusufu', avatar: 'https://i.pravatar.cc/150?img=38', rating: 5, comment: 'Quick medical attention when needed!', date: '2026-01-24' },
      { id: 2, name: 'Yusuph Mwakidudu', avatar: 'https://i.pravatar.cc/150?img=27', rating: 4, comment: 'Good for minor health issues.', date: '2026-01-18' },
      { id: 3, name: 'Rehema Sadiki', avatar: 'https://i.pravatar.cc/150?img=39', rating: 4, comment: 'Friendly medical staff.', date: '2026-01-12' },
      { id: 4, name: 'Azizi Kondo', avatar: 'https://i.pravatar.cc/150?img=28', rating: 3, comment: 'Limited facilities but helpful.', date: '2026-01-06' }
    ]
  },
  { 
    id: 11, 
    name: 'Yombo 2', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.7753, 39.2092], 
    desc: 'Yombo 2 student residence.',
    detailedDesc: 'Yombo 2 is a modern student hostel offering comfortable accommodation with study rooms, common areas, and laundry facilities.',
    wifi: true, 
    ac: false, 
    parking: false,
    wheelchair: false,
    food: false,
    charging: true,
    openingHours: '24/7 (Residence)',
    population: 'high',
    reviews: [
      { id: 1, name: 'Victor Lawrence', avatar: 'https://i.pravatar.cc/150?img=29', rating: 4, comment: 'Good WiFi and study environment.', date: '2026-01-21' },
      { id: 2, name: 'Jackline Mushi', avatar: 'https://i.pravatar.cc/150?img=40', rating: 4, comment: 'Clean and well-maintained rooms.', date: '2026-01-15' },
      { id: 3, name: 'Oscar Mwakibete', avatar: 'https://i.pravatar.cc/150?img=30', rating: 3, comment: 'Can be noisy during weekends.', date: '2026-01-09' },
      { id: 4, name: 'Shukuru Mtei', avatar: 'https://i.pravatar.cc/150?img=41', rating: 5, comment: 'Great location near campus facilities!', date: '2026-01-03' }
    ]
  },
  { 
    id: 12, 
    name: 'Helsb Office', 
    type: 'Admin', 
    status: 'Open', 
    coords: [-6.7748, 39.2090], 
    desc: 'HELSB administrative office.',
    detailedDesc: 'The Higher Education Loans Board (HELSB) office assists students with loan applications, disbursements, and repayment guidance.',
    wifi: true, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    reviews: [
      { id: 1, name: 'Ruth Mbwana', avatar: 'https://i.pravatar.cc/150?img=42', rating: 4, comment: 'Helped me with my student loan smoothly.', date: '2026-01-20' },
      { id: 2, name: 'Samson Mliga', avatar: 'https://i.pravatar.cc/150?img=31', rating: 3, comment: 'Slow processing but staff are patient.', date: '2026-01-14' },
      { id: 3, name: 'Esther Mhina', avatar: 'https://i.pravatar.cc/150?img=43', rating: 4, comment: 'Good guidance on loan matters.', date: '2026-01-08' }
    ]
  },
  { 
    id: 13, 
    name: 'New Library', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.7732, 39.2068], 
    desc: 'New university library building.',
    detailedDesc: 'The New Library is a modern facility with digital resources, group study rooms, multimedia centers, and extensive e-book collections.',
    wifi: true, 
    ac: true, 
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Sun: 7:00 AM - 11:00 PM',
    population: 'high',
    reviews: [
      { id: 1, name: 'Alex Mwanajuni', avatar: 'https://i.pravatar.cc/150?img=32', rating: 5, comment: 'Amazing modern facilities!', date: '2026-01-25' },
      { id: 2, name: 'Jane Mkamba', avatar: 'https://i.pravatar.cc/150?img=44', rating: 5, comment: 'Best place for research work.', date: '2026-01-19' },
      { id: 3, name: 'Freddy Masanja', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5, comment: 'Great e-book collection!', date: '2026-01-13' },
      { id: 4, name: 'Agnes Njau', avatar: 'https://i.pravatar.cc/150?img=45', rating: 4, comment: 'Spacious and quiet environment.', date: '2026-01-07' },
      { id: 5, name: 'Benedict Mushi', avatar: 'https://i.pravatar.cc/150?img=34', rating: 4, comment: 'Excellent study rooms.', date: '2026-01-01' }
    ]
  },
  { 
    id: 14, 
    name: 'Nkurumah', 
    type: 'Academic', 
    status: 'Open', 
    coords: [-6.7760, 39.2078], 
    desc: 'Nkurumah lecture block.',
    detailedDesc: 'Named after Ghana\'s first President, Nkurumah Block houses multiple lecture halls and tutorial rooms for various departments.',
    wifi: true, 
    ac: false, 
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM',
    population: 'medium',
    reviews: [
      { id: 1, name: 'Georges Mwakyusa', avatar: 'https://i.pravatar.cc/150?img=35', rating: 4, comment: 'Central location makes it convenient.', date: '2026-01-22' },
      { id: 2, name: 'Monica Nyagawa', avatar: 'https://i.pravatar.cc/150?img=46', rating: 3, comment: 'Can get crowded between classes.', date: '2026-01-16' },
      { id: 3, name: 'Abdul Msangi', avatar: 'https://i.pravatar.cc/150?img=36', rating: 4, comment: 'Good lecture rooms with good lighting.', date: '2026-01-10' },
      { id: 4, name: 'Violeth Mwalukongo', avatar: 'https://i.pravatar.cc/150?img=47', rating: 4, comment: 'Reliable WiFi in common areas.', date: '2026-01-04' }
    ]
  },
  { 
    id: 15, 
    name: 'Halls 2 Hostels', 
    type: 'Service', 
    status: 'Open', 
    coords: [-6.7755, 39.2105], 
    desc: 'Halls 2 student hostels.',
    detailedDesc: 'Halls 2 provides on-campus accommodation for students with various room options, common rooms, and 24-hour security.',
    wifi: false, 
    ac: false, 
    parking: false,
    wheelchair: false,
    food: true,
    charging: false,
    openingHours: '24/7 (Residence)',
    population: 'high',
    reviews: [
      { id: 1, name: 'Kelvin Mushi', avatar: 'https://i.pravatar.cc/150?img=37', rating: 3, comment: 'Basic but affordable accommodation.', date: '2026-01-21' },
      { id: 2, name: 'Gloria Mtegeme', avatar: 'https://i.pravatar.cc/150?img=48', rating: 3, comment: 'Good social environment.', date: '2026-01-15' },
      { id: 3, name: 'John Mwakanyamale', avatar: 'https://i.pravatar.cc/150?img=38', rating: 4, comment: 'Close to cafeteria and library.', date: '2026-01-09' },
      { id: 4, name: 'Mariam Mwakidudu', avatar: 'https://i.pravatar.cc/150?img=49', rating: 2, comment: 'Facilities need renovation.', date: '2026-01-03' },
      { id: 5, name: 'Bakari Mgeni', avatar: 'https://i.pravatar.cc/150?img=39', rating: 3, comment: 'Good security and location.', date: '2026-12-28' }
    ]
  }
];

// Helper function to get location by ID
export const getLocationById = (id) => mockLocations.find(loc => loc.id === id);

// Helper function to search locations by name, staff, or service
export const searchLocations = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return mockLocations.filter(loc => 
    loc.name.toLowerCase().includes(q) ||
    loc.desc.toLowerCase().includes(q) ||
    loc.type.toLowerCase().includes(q) ||
    loc.detailedDesc.toLowerCase().includes(q) ||
    (loc.services && loc.services.some(s => s.toLowerCase().includes(q)))
  );
};

export default mockLocations;
