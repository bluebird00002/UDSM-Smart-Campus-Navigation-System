const mockLocations = [
  // ===== SERVICE & STUDENT SUPPORT =====
  {
    id: 1,
    name: 'University Health Centre',
    type: 'Service',
    status: 'Open',
    coords: [-6.7751, 39.2095],
    desc: 'Medical consultations, treatment, and student health support.',
    detailedDesc: 'The University Health Centre provides comprehensive medical services including general consultations, first aid treatment, health emergency support, and NHIF registration assistance for all registered students and staff.',
    distance: 280,
    duration: 4,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM | Emergency: 24/7',
    population: 'medium',
    reviews: [
      { name: 'Ahmed Hassan', rating: 5, comment: 'Quick medical attention and caring staff. Very responsive to emergencies.', date: '2026-02-25' },
      { name: 'Grace Mwaki', rating: 4, comment: 'Good health services but waiting time can be long during peak hours.', date: '2026-02-20' },
      { name: 'Peter Kimani', rating: 5, comment: 'Professional doctors and clean facilities. Highly recommended!', date: '2026-02-15' },
      { name: 'Zainab Mbwana', rating: 4, comment: 'Affordable consultations and helpful staff members.', date: '2026-02-10' }
    ]
  },
  {
    id: 2,
    name: 'Library Services (Main Library)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7745, 39.2088],
    desc: 'Central academic library with books, research materials, study spaces, and photocopying.',
    detailedDesc: 'The Main Library is the hub of academic resources at UDSM, offering extensive book collections, digital research databases, quiet study rooms, reference desk assistance, computer labs, and high-speed internet access for all academic pursuits.',
    distance: 350,
    duration: 5,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Sun: 8:00 AM - 8:00 PM',
    population: 'high',
    reviews: [
      { name: 'Catherine Rite', rating: 5, comment: 'Perfect quiet environment for studying. Excellent book collection!', date: '2026-02-22' },
      { name: 'Andrew Masudi', rating: 5, comment: 'Best research facility on campus. WiFi is reliable and staff are helpful.', date: '2026-02-18' },
      { name: 'Rachel Gomes', rating: 4, comment: 'Great resources but sometimes crowded during exam periods.', date: '2026-02-14' },
      { name: 'Samuel Juma', rating: 4, comment: 'Good lighting and comfortable study spaces. Highly recommend.', date: '2026-02-08' },
      { name: 'Deborah Swai', rating: 5, comment: 'My favorite study spot on campus. Always clean and organized!', date: '2026-02-03' }
    ]
  },
  {
    id: 3,
    name: 'UDSM Post Office',
    type: 'Service',
    status: 'Open',
    coords: [-6.7758, 39.2102],
    desc: 'On-campus post office serving students and staff for mailing and parcels.',
    detailedDesc: 'The UDSM Post Office provides comprehensive postal services including domestic and international mailing, parcel handling, package tracking, and postal box rentals for convenient campus mail delivery.',
    distance: 420,
    duration: 6,
    wifi: false,
    ac: false,
    parking: true,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    reviews: [
      { name: 'Fatuma Hamad', rating: 4, comment: 'Efficient postal services and reasonable rates.', date: '2026-02-20' },
      { name: 'Hamis Juma', rating: 3, comment: 'Service is okay, but can be slow during busy times.', date: '2026-02-16' },
      { name: 'Zainab Khamis', rating: 4, comment: 'Good parcel handling and helpful staff members.', date: '2026-02-10' }
    ]
  },
  {
    id: 4,
    name: 'Bank Services (ATM Centre)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7752, 39.2078],
    desc: 'Major banks with cash services and ATMs available on campus near Cafeteria 1 & 2.',
    detailedDesc: 'Campus Banking Centre featuring CRDB, NBC, and NMB ATM services and banking support, providing convenient financial transactions for students and staff without leaving campus.',
    distance: 310,
    duration: 5,
    wifi: false,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Daily: 8:00 AM - 6:00 PM (ATM 24/7)',
    population: 'high',
    reviews: [
      { name: 'Martin Lupembe', rating: 5, comment: 'Multiple ATMs available, very convenient for students.', date: '2026-02-21' },
      { name: 'Angel John', rating: 4, comment: 'Good banking services right on campus. Staff are helpful.', date: '2026-02-13' },
      { name: 'Francis Mtei', rating: 5, comment: 'Fast transactions and reliable ATMs. Highly recommended!', date: '2026-02-07' }
    ]
  },
  {
    id: 5,
    name: 'University Computing Centre (UCC)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7762, 39.2085],
    desc: 'ICT support and computing services for students and staff.',
    detailedDesc: 'The University Computing Centre provides technical IT support, hardware troubleshooting, software licensing, network assistance, and computer training labs to support the campus digital infrastructure.',
    distance: 290,
    duration: 4,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'medium',
    reviews: [
      { name: 'Steven Kyaruzi', rating: 5, comment: 'Excellent technical support team. Very responsive!', date: '2026-02-23' },
      { name: 'Irene Nyerere', rating: 4, comment: 'Good IT solutions and knowledgeable staff members.', date: '2026-02-17' },
      { name: 'Daniel Mdegella', rating: 4, comment: 'Helpful for network issues and software installations.', date: '2026-02-11' }
    ]
  },
  {
    id: 6,
    name: 'Cafeteria 1 (Main Campus)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7748, 39.2092],
    desc: 'Primary student dining hall with a variety of meals and snacks.',
    detailedDesc: 'The main campus cafeteria offers diverse meal options including breakfast, lunch, and dinner with local and international dishes, fair pricing, and comfortable seating for students and staff.',
    distance: 200,
    duration: 3,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Daily: 7:00 AM - 9:00 PM',
    population: 'high',
    reviews: [
      { name: 'Diana Mhina', rating: 4, comment: 'Good variety of meals and reasonable prices.', date: '2026-02-19' },
      { name: 'Joseph Mushi', rating: 4, comment: 'Tasty food with quick service during lunch hours.', date: '2026-02-14' },
      { name: 'Gladness Mbise', rating: 5, comment: 'Best affordable food spot on campus!', date: '2026-02-09' }
    ]
  },
  {
    id: 7,
    name: 'Cafeteria 2 (Near Library)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7740, 39.2080],
    desc: 'Popular student food court with light snacks and beverages.',
    detailedDesc: 'Secondary cafeteria near library offering quick snacks, beverages, light meals, and refreshments perfect for studying or quick breaks between classes.',
    distance: 380,
    duration: 5,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Daily: 7:00 AM - 7:00 PM',
    population: 'high',
    reviews: [
      { name: 'Victor Lawrence', rating: 4, comment: 'Great snacks and beverages. Convenient near library.', date: '2026-02-21' },
      { name: 'Jackline Mushi', rating: 4, comment: 'Quick service and good quality refreshments.', date: '2026-02-15' },
      { name: 'Oscar Mwakibete', rating: 3, comment: 'Good food but can get crowded during peak hours.', date: '2026-02-09' }
    ]
  },

  // ===== ACADEMIC & TEACHING LOCATIONS =====
  {
    id: 8,
    name: 'Department of Computer Science & Engineering',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7755, 39.2075],
    desc: 'Core computing department offering undergraduate & postgraduate programs.',
    detailedDesc: 'The Department of Computer Science & Engineering is renowned for its advanced computing programs, offering lectures, practical labs, research facilities, and academic advising for all computing disciplines.',
    distance: 320,
    duration: 5,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    population: 'high',
    staff: [
      { name: 'Prof. James Mwase', title: 'Department Head', availability: 'available', phone: '+255 22 241 0501', email: 'j.mwase@udsm.ac.tz' },
      { name: 'Dr. Linda Kimani', title: 'Senior Lecturer', availability: 'busy', phone: '+255 22 241 0502', email: 'l.kimani@udsm.ac.tz' },
      { name: 'Mr. Kenneth Mwangi', title: 'Lab Coordinator', availability: 'available', phone: '+255 22 241 0503', email: 'k.mwangi@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Rashid Hassan', rating: 5, comment: 'Excellent computing labs and resources. Great faculty!', date: '2026-02-25' },
      { name: 'Jasmine Kamau', rating: 5, comment: 'Modern facilities and supportive academic environment.', date: '2026-02-19' },
      { name: 'Kenneth Mwangi', rating: 4, comment: 'Good labs but WiFi can be slow during peak hours.', date: '2026-02-13' },
      { name: 'Comfort Banda', rating: 5, comment: 'Accessible building with state-of-the-art equipment!', date: '2026-02-07' }
    ]
  },
  {
    id: 9,
    name: 'Department of Electronics & Telecommunication Engineering',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7768, 39.2098],
    desc: 'Engineering department focused on electronics, telecommunications & research.',
    detailedDesc: 'The Department of Electronics & Telecommunication Engineering offers specialized labs, telecommunications equipment, research facilities, and practical training for advanced engineering studies.',
    distance: 410,
    duration: 6,
    wifi: true,
    ac: false,
    parking: true,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    population: 'medium',
    staff: [
      { name: 'Prof. Robert Kipchoge', title: 'Department Chair', availability: 'available', phone: '+255 22 241 0510', email: 'r.kipchoge@udsm.ac.tz' },
      { name: 'Dr. Nancy Lyimo', title: 'Lab Director', availability: 'available', phone: '+255 22 241 0511', email: 'n.lyimo@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Kevin Mwakibete', rating: 5, comment: 'State-of-the-art labs and excellent equipment!', date: '2026-02-21' },
      { name: 'Nancy Lyimo', rating: 4, comment: 'Good study environment and knowledgeable staff.', date: '2026-02-16' },
      { name: 'Brian Mushi', rating: 4, comment: 'Spacious building with good ventilation.', date: '2026-02-11' },
      { name: 'Patricia Sanga', rating: 4, comment: 'Excellent practical training opportunities.', date: '2026-02-06' }
    ]
  },
  {
    id: 10,
    name: 'Centre for Virtual Learning (CVL)',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7770, 39.2070],
    desc: 'Facilitates online and blended learning systems.',
    detailedDesc: 'The Centre for Virtual Learning supports e-learning initiatives, virtual course delivery, online student engagement, and digital education technology training for modern academic needs.',
    distance: 450,
    duration: 6,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    staff: [
      { name: 'Dr. Emily Jackson', title: 'Director', availability: 'available', phone: '+255 22 241 0520', email: 'e.jackson@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student A', rating: 5, comment: 'Innovative e-learning platform and great support.', date: '2026-02-20' },
      { name: 'Student B', rating: 4, comment: 'Good virtual learning tools and technical assistance.', date: '2026-02-12' }
    ]
  },
  {
    id: 11,
    name: 'Lecture Theatre Block A',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7750, 39.2085],
    desc: 'Houses large lecture spaces for core courses.',
    detailedDesc: 'Lecture Theatre Block A features large auditoriums equipped with modern audio-visual systems, comfortable seating for 200-300 students, and facilities for seminars and presentations.',
    distance: 250,
    duration: 4,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM',
    population: 'high',
    reviews: [
      { name: 'Peter Ngowi', rating: 4, comment: 'Great acoustics and projector quality.', date: '2026-02-20' },
      { name: 'Lisa Mrema', rating: 3, comment: 'Gets warm during afternoon classes without AC.', date: '2026-02-15' },
      { name: 'Tom Harris', rating: 5, comment: 'Best lecture theatre on campus!', date: '2026-02-10' },
      { name: 'Joyce Sebastian', rating: 4, comment: 'Comfortable seating and good facilities.', date: '2026-02-05' }
    ]
  },
  {
    id: 12,
    name: 'Lecture Theatre Block B',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7745, 39.2075],
    desc: 'Secondary lecture hall block for mid-size classes.',
    detailedDesc: 'Lecture Theatre Block B provides mid-sized lecture halls with modern presentation equipment, suitable for 100-150 student capacity classes and group activities.',
    distance: 320,
    duration: 5,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM',
    population: 'high',
    reviews: [
      { name: 'Georges Mwakyusa', rating: 4, comment: 'Central location and good facilities.', date: '2026-02-22' },
      { name: 'Monica Nyagawa', rating: 3, comment: 'Can get crowded between class changes.', date: '2026-02-16' },
      { name: 'Abdul Msangi', rating: 4, comment: 'Good lecture rooms with excellent lighting.', date: '2026-02-10' },
      { name: 'Violeth Mwalukongo', rating: 4, comment: 'Reliable WiFi and good audio systems.', date: '2026-02-04' }
    ]
  },
  {
    id: 13,
    name: 'Faculty of Science Lecture Hall',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7765, 39.2090],
    desc: 'Host for science faculty lectures and labs.',
    detailedDesc: 'The Faculty of Science Lecture Hall complex includes lecture spaces, laboratory facilities, and workshop areas for physics, chemistry, biology, and mathematics teaching with modern equipment.',
    distance: 380,
    duration: 5,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    population: 'high',
    reviews: [
      { name: 'Student C', rating: 5, comment: 'Excellent science labs and teaching facilities.', date: '2026-02-21' },
      { name: 'Student D', rating: 4, comment: 'Good equipment but labs can get crowded.', date: '2026-02-15' },
      { name: 'Student E', rating: 4, comment: 'Modern facilities and supportive staff.', date: '2026-02-09' }
    ]
  },
  {
    id: 14,
    name: 'Engineering Workshop Labs',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7772, 39.2092],
    desc: 'Hands-on engineering labs for mechanical and electrical practice.',
    detailedDesc: 'Engineering Workshop Labs provide hands-on practical training with advanced machinery, tools, and equipment for mechanical engineering, electrical engineering, and fabrication projects.',
    distance: 490,
    duration: 7,
    wifi: false,
    ac: false,
    parking: true,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    population: 'medium',
    reviews: [
      { name: 'Student F', rating: 5, comment: 'Great practical experience with modern equipment!', date: '2026-02-23' },
      { name: 'Student G', rating: 4, comment: 'Good workshop facilities and experienced instructors.', date: '2026-02-17' }
    ]
  },
  {
    id: 15,
    name: 'School of Business Lecture Block',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7758, 39.2070],
    desc: 'Lecture block for business & management courses.',
    detailedDesc: 'The School of Business Lecture Block houses business faculty, dedicated lecture halls for management and economics courses, group work spaces, and business research facilities.',
    distance: 370,
    duration: 5,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    population: 'high',
    staff: [
      { name: 'Prof. Susan Trumbull', title: 'Dean of Business', availability: 'busy', phone: '+255 22 241 0530', email: 's.trumbull@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student H', rating: 5, comment: 'Modern business school with excellent facilities.', date: '2026-02-20' },
      { name: 'Student I', rating: 4, comment: 'Good teaching environment and supportive faculty.', date: '2026-02-14' }
    ]
  },

  // ===== ADMINISTRATIVE & STUDENT SERVICES =====
  {
    id: 16,
    name: 'Registry Office',
    type: 'Admin',
    status: 'Open',
    coords: [-6.7755, 39.2095],
    desc: 'Central office for student records, registration & documentation.',
    detailedDesc: 'The Registry Office maintains comprehensive student records, manages academic registration, issues transcripts and certificates, provides enrollment verification, and ensures documentation accuracy.',
    distance: 300,
    duration: 4,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'high',
    staff: [
      { name: 'Mr. Amjad Hassan', title: 'Registrar', availability: 'available', phone: '+255 22 241 0600', email: 'a.hassan@udsm.ac.tz' },
      { name: 'Ms. Grace Mwaki', title: 'Records Officer', availability: 'available', phone: '+255 22 241 0601', email: 'g.mwaki@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Emily Jackson', rating: 5, comment: 'Got my transcript within 2 days. Very efficient!', date: '2026-02-18' },
      { name: 'Michael Chen', rating: 4, comment: 'Professional staff and clear processes.', date: '2026-02-12' },
      { name: 'Anna Mwamba', rating: 4, comment: 'Good AC and comfortable waiting area.', date: '2026-02-08' },
      { name: 'James Wilson', rating: 3, comment: 'Busy during exam periods.', date: '2026-02-02' }
    ]
  },
  {
    id: 17,
    name: 'Bursar\'s Office',
    type: 'Admin',
    status: 'Open',
    coords: [-6.7760, 39.2100],
    desc: 'Handles student fee payments and financial support.',
    detailedDesc: 'The Bursar\'s Office manages tuition fee payments, accommodation charges, financial aid distribution, student loan processing, and provides financial counseling services.',
    distance: 330,
    duration: 5,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'medium',
    staff: [
      { name: 'Mrs. Jackline Banda', title: 'Bursar', availability: 'busy', phone: '+255 22 241 0610', email: 'j.banda@udsm.ac.tz' },
      { name: 'Mr. Joseph Mushi', title: 'Payments Officer', availability: 'available', phone: '+255 22 241 0611', email: 'j.mushi@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Martin Lupembe', rating: 3, comment: 'Long waiting times but helpful staff.', date: '2026-02-19' },
      { name: 'Angel John', rating: 3, comment: 'Can be hectic during payment deadlines.', date: '2026-02-13' },
      { name: 'Francis Mtei', rating: 4, comment: 'Payment process is straightforward.', date: '2026-02-07' }
    ]
  },
  {
    id: 18,
    name: 'Student Affairs Office',
    type: 'Admin',
    status: 'Open',
    coords: [-6.7750, 39.2088],
    desc: 'Manages student welfare, guidance, and support services.',
    detailedDesc: 'Student Affairs Office provides comprehensive support including counseling services, welfare guidance, student club coordination, special needs assistance, and student welfare programs.',
    distance: 280,
    duration: 4,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    staff: [
      { name: 'Dr. Amina Yusufu', title: 'Dean of Students', availability: 'available', phone: '+255 22 241 0620', email: 'a.yusufu@udsm.ac.tz' },
      { name: 'Ms. Rehema Sadiki', title: 'Counselor', availability: 'available', phone: '+255 22 241 0621', email: 'r.sadiki@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Fatuma Hamad', rating: 5, comment: 'Very supportive counselors and helpful guidance!', date: '2026-02-22' },
      { name: 'Hamis Juma', rating: 4, comment: 'Great support for student club activities.', date: '2026-02-16' },
      { name: 'Zainab Mbwana', rating: 5, comment: 'Excellent care and understanding staff.', date: '2026-02-10' }
    ]
  },
  {
    id: 19,
    name: 'Directorate of Human Resources',
    type: 'Admin',
    status: 'Open',
    coords: [-6.7765, 39.2105],
    desc: 'Coordinates staff HR services and admin support.',
    detailedDesc: 'The Directorate of Human Resources manages staff recruitment, payroll administration, benefits processing, professional development, and comprehensive HR support for campus staff.',
    distance: 360,
    duration: 5,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    staff: [
      { name: 'Mr. Paul Kyaruzi', title: 'HR Director', availability: 'busy', phone: '+255 22 241 0630', email: 'p.kyaruzi@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Staff Member A', rating: 4, comment: 'Efficient HR services and professional handling.', date: '2026-02-21' },
      { name: 'Staff Member B', rating: 4, comment: 'Good support for staff benefits and payroll.', date: '2026-02-15' }
    ]
  },
  {
    id: 20,
    name: 'Directorate of Undergraduate Studies',
    type: 'Admin',
    status: 'Open',
    coords: [-6.7748, 39.2080],
    desc: 'Oversees undergraduate academic programs & policies.',
    detailedDesc: 'This directorate administers undergraduate curriculum, degree requirements, academic policies, student advising, program development, and ensures quality undergraduate education delivery.',
    distance: 340,
    duration: 5,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'medium',
    staff: [
      { name: 'Prof. Daniel Kipchoge', title: 'Director', availability: 'available', phone: '+255 22 241 0640', email: 'd.kipchoge@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student J', rating: 5, comment: 'Clear academic guidelines and helpful advising!', date: '2026-02-20' },
      { name: 'Student K', rating: 4, comment: 'Good coordination of academic programs.', date: '2026-02-14' }
    ]
  },

  // ===== STUDENT LIFE & SOCIAL SPACES =====
  {
    id: 21,
    name: 'UDSM Gym & Sports Complex',
    type: 'Service',
    status: 'Open',
    coords: [-6.7735, 39.2110],
    desc: 'Fitness gym and courts for student wellness.',
    detailedDesc: 'The Sports Complex features a full fitness gym with modern equipment, basketball courts, tennis courts, football field, athlete training areas, and organized fitness programs.',
    distance: 520,
    duration: 7,
    wifi: false,
    ac: false,
    parking: true,
    wheelchair: true,
    food: true,
    charging: false,
    openingHours: 'Daily: 6:00 AM - 9:00 PM',
    population: 'high',
    reviews: [
      { name: 'Victor Lawrence', rating: 5, comment: 'Great facilities for sports and fitness!', date: '2026-02-23' },
      { name: 'Jackline Mushi', rating: 5, comment: 'Well-maintained courts and modern gym equipment.', date: '2026-02-17' },
      { name: 'Oscar Mwakibete', rating: 4, comment: 'Good place for fitness and team sports.', date: '2026-02-11' }
    ]
  },
  {
    id: 22,
    name: 'Student Union Building',
    type: 'Service',
    status: 'Open',
    coords: [-6.7752, 39.2098],
    desc: 'Central student organization space with meeting rooms & lounges.',
    detailedDesc: 'The Student Union Building serves as the hub for student organizations, clubs, and activities, featuring meeting rooms, lounges, event spaces, and recreational facilities.',
    distance: 290,
    duration: 4,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    population: 'high',
    reviews: [
      { name: 'Shukuru Mtei', rating: 5, comment: 'Great hub for student activities and clubs!', date: '2026-02-22' },
      { name: 'Student L', rating: 4, comment: 'Good facilities for organization meetings.', date: '2026-02-16' }
    ]
  },
  {
    id: 23,
    name: 'Cafeteria 3 (Sports Complex)',
    type: 'Service',
    status: 'Open',
    coords: [-6.7730, 39.2108],
    desc: 'Casual eatery popular with sports attendees.',
    detailedDesc: 'Located at the Sports Complex, this casual cafeteria offers quick snacks, sports beverages, light meals, and refreshments for athletes and fitness enthusiasts.',
    distance: 540,
    duration: 7,
    wifi: false,
    ac: false,
    parking: true,
    wheelchair: true,
    food: true,
    charging: false,
    openingHours: 'Daily: 8:00 AM - 8:00 PM',
    population: 'high',
    reviews: [
      { name: 'Kelvin Mushi', rating: 4, comment: 'Good snacks for athletes and sports fans.', date: '2026-02-21' },
      { name: 'Gloria Mtegeme', rating: 4, comment: 'Convenient location near gym facilities.', date: '2026-02-15' }
    ]
  },
  {
    id: 24,
    name: 'Bookshop / Campus Stationery',
    type: 'Service',
    status: 'Open',
    coords: [-6.7746, 39.2085],
    desc: 'On-campus bookshop with academic materials and stationery.',
    detailedDesc: 'The Campus Bookshop provides comprehensive academic resources including textbooks, reference materials, stationery supplies, educational software, and campus merchandise.',
    distance: 310,
    duration: 4,
    wifi: false,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    population: 'medium',
    reviews: [
      { name: 'John Mwakanyamale', rating: 4, comment: 'Good selection of textbooks and stationery.', date: '2026-02-20' },
      { name: 'Mariam Mwakidudu', rating: 4, comment: 'Reasonable prices and helpful staff.', date: '2026-02-14' },
      { name: 'Bakari Mgeni', rating: 3, comment: 'Good bookshop but can be busy during semester start.', date: '2026-02-08' }
    ]
  },

  // ===== HOUSING & DORMS =====
  {
    id: 25,
    name: 'Male Student Hostels - Block A',
    type: 'Service',
    status: 'Open',
    coords: [-6.7740, 39.2100],
    desc: 'On-campus accommodation for male students.',
    detailedDesc: 'Male Student Hostels Block A provides comfortable on-campus accommodation with single and shared rooms, common kitchen facilities, laundry services, and 24-hour security.',
    distance: 380,
    duration: 5,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: false,
    food: true,
    charging: true,
    openingHours: '24/7',
    population: 'high',
    reviews: [
      { name: 'Student M', rating: 4, comment: 'Good accommodation with friendly residents.', date: '2026-02-22' },
      { name: 'Student N', rating: 4, comment: 'WiFi is good and rooms are clean.', date: '2026-02-16' },
      { name: 'Student O', rating: 3, comment: 'Basic facilities but affordable for students.', date: '2026-02-10' }
    ]
  },
  {
    id: 26,
    name: 'Female Student Hostels - Block B',
    type: 'Service',
    status: 'Open',
    coords: [-6.7758, 39.2103],
    desc: 'On-campus accommodation for female students.',
    detailedDesc: 'Female Student Hostels Block B offers comfortable residential spaces with modern facilities, laundry services, common study lounges, and comprehensive security measures.',
    distance: 340,
    duration: 5,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: '24/7',
    population: 'high',
    reviews: [
      { name: 'Patricia Mwanza', rating: 5, comment: 'Great location and friendly environment!', date: '2026-02-23' },
      { name: 'Sophie Kasanga', rating: 5, comment: 'Clean rooms and helpful management.', date: '2026-02-17' },
      { name: 'Student P', rating: 4, comment: 'Good facilities and supportive community.', date: '2026-02-11' }
    ]
  },
  {
    id: 27,
    name: 'Mixed Hostels - Block C',
    type: 'Service',
    status: 'Open',
    coords: [-6.7768, 39.2090],
    desc: 'Mixed accommodation block.',
    detailedDesc: 'Mixed Hostels Block C provides diverse residential options with shared and private accommodations, study lounges, recreational areas, and dedicated support services.',
    distance: 420,
    duration: 6,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: true,
    charging: true,
    openingHours: '24/7',
    population: 'high',
    reviews: [
      { name: 'Amelia Nkosi', rating: 5, comment: 'Best residential block with excellent amenities!', date: '2026-02-24' },
      { name: 'Isaac Kiplagat', rating: 5, comment: 'AC rooms and great community atmosphere.', date: '2026-02-18' },
      { name: 'Marcus Karungi', rating: 4, comment: 'Convenient to lecture halls and library.', date: '2026-02-12' }
    ]
  },

  // ===== OTHER ACADEMIC / SERVICE LOCATIONS =====
  {
    id: 28,
    name: 'Centre for Chinese Studies',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7755, 39.2075],
    desc: 'Research & language support in Chinese studies.',
    detailedDesc: 'The Centre for Chinese Studies facilitates language learning, cultural exchange, research collaborations with Chinese institutions, and promotes understanding of Chinese culture and development.',
    distance: 320,
    duration: 5,
    wifi: true,
    ac: true,
    parking: false,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    staff: [
      { name: 'Prof. Li Chen', title: 'Director', availability: 'available', phone: '+255 22 241 0700', email: 'l.chen@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student Q', rating: 5, comment: 'Excellent language learning programs!', date: '2026-02-21' },
      { name: 'Student R', rating: 4, comment: 'Good resources for Chinese cultural studies.', date: '2026-02-15' }
    ]
  },
  {
    id: 29,
    name: 'Institute of Kiswahili Studies',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7762, 39.2088],
    desc: 'Focused on Kiswahili language research & training.',
    detailedDesc: 'The Institute of Kiswahili Studies conducts research on Kiswahili language, offers linguistic training, supports language development projects, and preserves Kiswahili cultural heritage.',
    distance: 290,
    duration: 4,
    wifi: true,
    ac: false,
    parking: false,
    wheelchair: true,
    food: false,
    charging: false,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'medium',
    staff: [
      { name: 'Dr. Amina Khamis', title: 'Institute Director', availability: 'available', phone: '+255 22 241 0710', email: 'a.khamis@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student S', rating: 5, comment: 'Excellent Kiswahili language programs!', date: '2026-02-20' },
      { name: 'Student T', rating: 4, comment: 'Great linguistic expertise and support.', date: '2026-02-14' }
    ]
  },
  {
    id: 30,
    name: 'Centre for Climate Change Studies',
    type: 'Academic',
    status: 'Open',
    coords: [-6.7770, 39.2078],
    desc: 'Research centre for climate impact & sustainability.',
    detailedDesc: 'This research centre conducts climate change studies, environmental research, sustainability initiatives, and provides scientific data for policy development and community engagement.',
    distance: 450,
    duration: 6,
    wifi: true,
    ac: true,
    parking: true,
    wheelchair: true,
    food: false,
    charging: true,
    openingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    population: 'low',
    staff: [
      { name: 'Prof. Michael Mwase', title: 'Research Director', availability: 'busy', phone: '+255 22 241 0720', email: 'm.mwase@udsm.ac.tz' }
    ],
    reviews: [
      { name: 'Student U', rating: 5, comment: 'Cutting-edge climate research initiatives!', date: '2026-02-22' },
      { name: 'Student V', rating: 5, comment: 'Excellent research facilities and expert staff.', date: '2026-02-16' }
    ]
  }
];

export const getLocationById = (id) => mockLocations.find(loc => loc.id === id);

export const searchLocations = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return mockLocations.filter(loc => 
    loc.name.toLowerCase().includes(q) ||
    loc.desc.toLowerCase().includes(q) ||
    loc.type.toLowerCase().includes(q) ||
    loc.detailedDesc.toLowerCase().includes(q)
  );
};

export default mockLocations;
