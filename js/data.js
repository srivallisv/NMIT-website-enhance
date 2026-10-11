/* ==========================================
   NMIT REDESIGN - VERIFIED INSTITUTIONAL DATA
   ========================================== */

const NMIT_DATA = {
  baseUrl: 'https://nitte.edu.in/nmit/',

  contact: {
    address: 'Nitte Meenakshi Institute of Technology, Nitte University Bengaluru Campus, Yelahanka, Bengaluru, Karnataka-560064',
    officePhone: '+91-80-22167800',
    admissionsPhone: '+91-81510-04455',
    admissionsAltPhone: '+91-80-22167929',
    email: 'admissions.nmit@nitte.edu.in',
    whatsApp: '918147354951',
    applyUrl: 'https://apply.nitte.edu.in/'
  },

  social: {
    facebook: 'https://www.facebook.com/NMITBangalore',
    twitter: 'https://twitter.com/NMITBangalore',
    instagram: 'https://www.instagram.com/nmitbangalore/',
    linkedIn: 'https://www.linkedin.com/school/nmit-bangalore/',
    youTube: 'https://www.youtube.com/channel/UCDtEzhlhNmASrxUz1MxQrhQ',
    blog: 'https://nittebangalore.blogspot.com/'
  },

  placements: {
    highestSalary: '58.93 Lakhs',
    companiesVisited: '300+',
    offersPerYear: '1200+',
    officialUrl: 'https://nitte.edu.in/nmit/placement.php'
  },

  announcements: [
    {
      title: 'Examination Time Table of VTU and Nitte University',
      url: 'https://drive.google.com/drive/folders/1kkDvke9ZZNdLoGoAl13G4N2lE-dt2Sla?usp=sharing'
    },
    {
      title: 'Check AICTE Scholarship/Fellowship Schemes',
      url: 'https://www.aicte.gov.in/schemes/students-development-schemes'
    },
    {
      title: 'Timetable for SEE May - June 2025 (Even Semesters) under VTU',
      url: 'https://nitte.edu.in/nmit/announcement.php'
    },
    {
      title: 'Timetable for SEE May - June 2025 (Even Semesters) under NDU',
      url: 'https://nitte.edu.in/nmit/announcement.php'
    }
  ],

  news: [
    {
      id: 803,
      title: 'Nitte University Alumnus Sumanth Kamath Earns Global Recognition for Responsible Cybersecurity Research',
      date: '28 Jul 2026',
      url: 'https://nitte.edu.in/nmit/news-details.php?id=803'
    },
    {
      id: 801,
      title: 'NMIT to Host 5-Day Faculty Development Program on 5G and Emerging 6G Technologies',
      date: '22 Jul 2026',
      url: 'https://nitte.edu.in/nmit/news-details.php?id=801'
    },
    {
      id: 802,
      title: 'Dr. Mamatha Maheshwarappa Joins the Prestigious Fellowship of the Royal Aeronautical Society',
      date: '15 Jul 2026',
      url: 'https://nitte.edu.in/nmit/news-details.php?id=802'
    },
    {
      id: 797,
      title: 'NMIT Aeronautical Engineering Student Chapter Recognized by Aeronautical Society of India',
      date: '05 Mar 2026',
      url: 'https://nitte.edu.in/nmit/news-details.php?id=797'
    }
  ],

  videos: [
    {
      id: '3dsRZC-RdLQ',
      title: 'NMIT Campus Video 1',
      thumb: 'https://img.youtube.com/vi/3dsRZC-RdLQ/hqdefault.jpg'
    },
    {
      id: '68SHAw7CpWY',
      title: 'NMIT Campus Video 2',
      thumb: 'https://img.youtube.com/vi/68SHAw7CpWY/hqdefault.jpg'
    },
    {
      id: 'fXEtGuG9bS4',
      title: 'NMIT Campus Video 3',
      thumb: 'https://img.youtube.com/vi/fXEtGuG9bS4/hqdefault.jpg'
    }
  ],

  programs: [
    /* B.Tech (12) */
    { name: 'Artificial Intelligence & Data Science', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-in-artificialintelligence-and-datascience.php' },
    { name: 'Artificial Intelligence & Machine Learning', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-in-artificialintelligence-and-machinelearning.php' },
    { name: 'Aeronautical Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-aeronautical-engineering.php' },
    { name: 'Civil Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-civil-engineering.php' },
    { name: 'Computer Science & Business Systems', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-computer-science-and-business-systems.php' },
    { name: 'Computer Science & Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-computer-science-engineering.php' },
    { name: 'Electrical & Electronics Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-electrical-and-electronics-engineering.php' },
    { name: 'Electronics & Communication Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-electronics-and-communication-engineering.php' },
    { name: 'Electronics Engineering (VLSI Design & Technology)', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-in-electronics-engineering-vlsi.php' },
    { name: 'Information Science & Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-information-science-and-engineering.php' },
    { name: 'Mechanical Engineering', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-mechanical-engineering.php' },
    { name: 'Robotics and Artificial Intelligence', category: 'btech', badge: 'B.Tech', url: 'https://nitte.edu.in/nmit/btech-robotics-and-artificial-intelligence.php' },

    /* B.Sc Hons (2) */
    { name: 'Civil Aviation Pilot Training', category: 'bsc', badge: 'B.Sc (Hons)', url: 'https://nitte.edu.in/nmit/bsc-civil-aviation-pilot-training.php' },
    { name: 'Civil Aviation Flight Dispatcher', category: 'bsc', badge: 'B.Sc (Hons)', url: 'https://nitte.edu.in/nmit/bsc-civil-aviation-flight-dispatchers.php' },

    /* Postgraduate (6: 4 M.Tech + MBA + MCA) */
    { name: 'Defence Technology', category: 'pg', badge: 'M.Tech', url: 'https://nitte.edu.in/nmit/mtech-in-defence-technology.php' },
    { name: 'Electric Vehicle Technology', category: 'pg', badge: 'M.Tech', url: 'https://nitte.edu.in/nmit/mtech-in-electric-vehicle-technology.php' },
    { name: 'Robotics and Artificial Intelligence', category: 'pg', badge: 'M.Tech', url: 'https://nitte.edu.in/nmit/mtech-in-robotics-ai.php' },
    { name: 'Structural Engineering', category: 'pg', badge: 'M.Tech', url: 'https://nitte.edu.in/nmit/mtech-in-structural-engineering.php' },
    { name: 'Master of Business Administration (MBA)', category: 'pg', badge: 'MBA', url: 'https://nitte.edu.in/nmit/MBA.php' },
    { name: 'Master of Computer Applications (MCA)', category: 'pg', badge: 'MCA', url: 'https://nitte.edu.in/nmit/MCA.php' },

    /* Doctoral (1) */
    { name: 'Doctor of Philosophy (Ph.D.)', category: 'phd', badge: 'Ph.D', url: 'https://nitte.edu.in/phd.php' },

    /* Applied Sciences & Humanities (2) */
    { name: 'Department of Applied Sciences', category: 'supporting', badge: 'Supporting Dept', url: 'https://nitte.edu.in/nmit/supporting-departments.php' },
    { name: 'Department of Humanities and Social Sciences', category: 'supporting', badge: 'Supporting Dept', url: 'https://nitte.edu.in/nmit/humanities-and-social-sciences.php' }
  ],

  navMenus: {
    about: [
      { name: 'About Nitte Education Trust', url: 'https://nitte.edu.in/nmit/about-nitte.php' },
      { name: 'About NMIT', url: 'https://nitte.edu.in/nmit/about-nmit-bangalore.php' },
      { name: 'Vision, Mission & Core Values', url: 'https://nitte.edu.in/nmit/vision-mission.php' },
      { name: 'Founder', url: 'https://nitte.edu.in/nmit/founder.php' },
      { name: 'Advisor\'s Message', url: 'https://nitte.edu.in/nmit/advisor-message.php' },
      { name: 'Organogram', url: 'https://nitte.edu.in/nmit/organizational-structure.php' },
      { name: 'Principal', url: 'https://nitte.edu.in/nmit/principal.php' },
      { name: 'Governing Council', url: 'https://nitte.edu.in/nmit/governance-council.php' },
      { name: 'Discover Nitte', url: 'https://nitte.edu.in/discover-nitte.php' }
    ],
    research: [
      { name: 'Center for Space Research', url: 'https://nitte.edu.in/nmit/center-for-research-space.php' },
      { name: 'Center for Robotics Research', url: 'https://nitte.edu.in/nmit/center-for-robotics-research.php' },
      { name: 'Center for Nanomaterials & MEMS', url: 'https://nitte.edu.in/nmit/center-for-nanomaterials-and-memes.php' },
      { name: 'Aerospace & Internet of Things', url: 'https://nitte.edu.in/nmit/aerospace-and-internet-of-things.php' },
      { name: 'Power Engineering', url: 'https://nitte.edu.in/nmit/power-engineering.php' },
      { name: 'Women Empowerment Center', url: 'https://nitte.edu.in/nmit/center-for-womens-empowerment.php' },
      { name: 'Quantum Computing Center', url: 'https://nitte.edu.in/nmit/center-for-quantum-computing.php' },
      { name: 'Cyber Security Center', url: 'https://nitte.edu.in/nmit/center-for-cyber-security.php' },
      { name: 'NMIT-AICTE Idea Lab', url: 'https://nitte.edu.in/nmit/nmit-aicte-idea-lab.php' },
      { name: 'Intel Unnati Lab', url: 'https://nitte.edu.in/nmit/intel-unnati-lab.php' },
      { name: 'Electric Vehicles Center', url: 'https://nitte.edu.in/nmit/center-for-electric-vehicles.php' },
      { name: 'Additive Manufacturing Center', url: 'https://nitte.edu.in/nmit/center-for-additive-manufacturing.php' },
      { name: 'Applied Mechatronics & Industry 4.0', url: 'https://nitte.edu.in/nmit/center-for-applied-mechatronics-and-industry.php' },
      { name: 'Anusandhana Journal', url: 'https://researchjournalnmit.wordpress.com/' },
      { name: 'I-STEM Portal', url: 'https://nitte.edu.in/nmit/istem.php' },
      { name: 'Policy for Research Promotion', url: 'https://nitte.edu.in/nmit/promotion-of-research.php' },
      { name: 'Code of Ethics', url: 'https://nitte.edu.in/nmit/code-of-ethics.php' },
      { name: 'IPR & Consultancy Policy', url: 'https://nitte.edu.in/nmit/ipr-consultancy-policy.php' }
    ],
    life: [
      { name: 'Sports', url: 'https://nitte.edu.in/nmit/sports.php' },
      { name: 'NitteOn 2026', url: 'https://nitte.edu.in/nmit/nitteon.php' },
      { name: 'Sports & Physical Education', url: 'https://nitte.edu.in/nmit/sports-physical-education.php' },
      { name: 'NCC', url: 'https://nitte.edu.in/nmit/ncc.php' },
      { name: 'NSS', url: 'https://nitte.edu.in/nmit/nss.php' },
      { name: 'Youth Wing of Red Cross Society', url: 'https://nitte.edu.in/nmit/red-cross-society.php' },
      { name: 'Rotaract Club', url: 'https://nitte.edu.in/nmit/rotaract.php' },
      { name: 'Anaadyanta', url: 'https://nitte.edu.in/nmit/anaadyanta.php' },
      { name: 'Chiguru', url: 'https://nitte.edu.in/nmit/chiguru.php' },
      { name: 'Student Council', url: 'https://nitte.edu.in/nmit/pdf/StudentsCouncil-2022-23.pdf' },
      { name: 'ECELLNMIT', url: 'https://www.ecellnmit.in/' },
      { name: 'Library & Information Centre', url: 'https://nitte.edu.in/nmit/library-and-information-center.php' },
      { name: 'Hostels', url: 'https://nitte.edu.in/nmit/hostels.php' },
      { name: 'Health Care', url: 'https://nitte.edu.in/nmit/healthcare.php' },
      { name: 'Transportation & Parking', url: 'https://nitte.edu.in/nmit/transport.php' },
      { name: 'Cafeteria', url: 'https://nitte.edu.in/nmit/canteen.php' },
      { name: 'Co-Operative Society', url: 'https://nitte.edu.in/nmit/coperative.php' },
      { name: 'Gymnasium', url: 'https://nitte.edu.in/nmit/gymnasium.php' },
      { name: 'Seminar Halls & Auditorium', url: 'https://nitte.edu.in/nmit/seminar-hall.php' },
      { name: 'ATM & Banking', url: 'https://nitte.edu.in/nmit/bank.php' },
      { name: 'Campus Security', url: 'https://nitte.edu.in/nmit/security.php' },
      { name: 'NMIT Innovation Policy', url: 'https://nitte.edu.in/nmit/img/pdf/IISP_NMIT_2021_Policy.pdf' },
      { name: 'IEDC', url: 'https://nitte.edu.in/nmit/iedc.php' },
      { name: 'MSME Incubation Center', url: 'https://nitte.edu.in/nmit/msme-incubulation-center.php' },
      { name: 'Institution Innovation Council', url: 'https://nitte.edu.in/nmit/iic.php' },
      { name: 'Mentoring System', url: 'https://nitte.edu.in/nmit/mentoring.php' },
      { name: 'Mental Health Support System', url: 'https://nitte.edu.in/nmit/counselling.php' },
      { name: 'Prevention of Ragging', url: 'https://nitte.edu.in/nmit/img/pdf/Anti-Ragging-Committee.pdf' }
    ],
    academics: [
      { name: 'Circulars', url: 'https://nitte.edu.in/nmit/circulars.php' },
      { name: 'Syllabus', url: 'https://nitte.edu.in/nmit/syllabus.php' },
      { name: 'Examination TimeTables', url: 'https://nitte.edu.in/nmit/examination-timetables.php' },
      { name: 'E-Results', url: 'https://nmitresults.contineo.in/' },
      { name: 'Application for Certificates', url: 'https://forms.gle/pJhshMiHwFWyVrX76' },
      { name: 'Credential Verification', url: 'https://nmit.directverify.in/student/#/app/request' },
      { name: 'Academic Calendar', url: 'https://nitte.edu.in/nmit/academic-calendar.php' },
      { name: 'Autonomy Status', url: 'https://nitte.edu.in/nmit/autonomy.php' },
      { name: 'Rules & Regulations', url: 'https://nitte.edu.in/nmit/rules-and-regulation.php' },
      { name: 'Scheme & Syllabus', url: 'https://nitte.edu.in/nmit/scheme-and-syllabus.php' },
      { name: 'Academic Council', url: 'https://nitte.edu.in/nmit/academic-council.php' }
    ],
    quickLinks: [
      { name: 'NMIT-LMS', url: 'http://lms.nmit.ac.in/' },
      { name: 'NIRF', url: 'https://nitte.edu.in/nmit/nirf.php' },
      { name: 'NBA - DCS Reports', url: 'https://nitte.edu.in/nmit/nba.php' },
      { name: 'NAAC', url: 'https://nitte.edu.in/nmit/naac.php' },
      { name: 'IQAC', url: 'https://nitte.edu.in/nmit/iqac.php' },
      { name: 'Mandatory Disclosure', url: 'https://nitte.edu.in/nmit/mandatory.php' },
      { name: 'Alumni Association', url: 'https://nitte.edu.in/nmit/alumni-association.php' },
      { name: 'Admissions', url: 'https://nitte.edu.in/nmit/admissions.php' },
      { name: 'Placements', url: 'https://nitte.edu.in/nmit/placement.php' },
      { name: 'Transportation', url: 'https://nitte.edu.in/nmit/transportation.php' },
      { name: 'Contact Us', url: 'https://nitte.edu.in/nmit/contact-nmit.php' },
      { name: 'NMIT Blogs', url: 'https://nitte.edu.in/nmit/blogs.php' },
      { name: 'Parent Portal', url: 'https://nmitparents.contineo.in/' },
      { name: 'Tech QnA', url: 'https://www.automa.one/chat' },
      { name: 'International Relations', url: 'https://www.nmit.ac.in/international-relations/index.php' }
    ]
  },

  alumni: [
    {
      id: 'balen-shah',
      name: 'Balen Shah',
      dept: 'M.Tech Structural Engineering',
      batch: '2016-2018',
      role: 'Prime Minister, Nepal',
      bio: 'Nepalese rapper, structural engineer and politician; first independent candidate elected mayor of Kathmandu; prioritised solid waste management, parking infrastructure, slum clearance, hawker management and beautification.'
    },
    {
      id: 'mamatha-m',
      name: 'Dr. Mamatha Maheshwarappa',
      dept: 'B.E. Electronics & Communication Engineering',
      batch: '2005-2009',
      role: 'Payload Systems Group Lead, UK Space Agency',
      bio: 'Payload Systems Group Lead at the UK Space Agency; previously technical lead on the SPEQTRE quantum-entanglement satellite project and worked on ESA\'s Sentinel 4 test campaign at RAL Space.'
    },
    {
      id: 'meghashree-dr',
      name: 'Meghashree D R',
      dept: 'B.Tech Computer Science & Engineering',
      batch: '2017',
      role: 'IAS Officer (Kerala Cadre)',
      bio: 'IAS officer (2017 batch, Kerala cadre) after 3 years as a software engineer; now Inspector General of Registration with additional charge as Director, Scheduled Tribes Development.'
    },
    {
      id: 'aniruddha-sastry',
      name: 'Aniruddha Sastry',
      dept: 'B.Tech Computer Science & Engineering',
      batch: '2018',
      role: 'Playback Singer & Actor',
      bio: 'Playback singer, actor, music producer, lyricist in the Kannada film industry; won the Karnataka State Award for Best Child Actor (2005) for Raakshasa.'
    },
    {
      id: 'prakash-matada',
      name: 'Prakash Matada',
      dept: 'B.E. Computer Science & Engineering',
      batch: '2001-2005',
      role: 'Wildlife Filmmaker',
      bio: 'Wildlife photographer and filmmaker; winner of awards at WildScreen and Jackson Wild film festivals; currently working on a landmark natural history series for the BBC and Apple TV.'
    },
    {
      id: 'srinidhi-sudhindra',
      name: 'Srinidhi Sudhindra',
      dept: 'B.E. Aeronautical Engineering',
      batch: '2018',
      role: 'Wing Design Engineer, Airbus UK',
      bio: 'Wing design engineer at Airbus, United Kingdom; actively mentors NMIT engineering students.'
    },
    {
      id: 'shriram',
      name: 'Shriram',
      dept: 'B.E. Electrical & Electronics Engineering',
      batch: '2012',
      role: 'Team Lead, ASML (USA)',
      bio: 'Team Lead at ASML (USA); M.Eng. Embedded Systems from BITS Pilani (2012-2014); MBA from NYU Stern (2023); recipient of SVP\'s Award for Early Career Excellence at Cisco.'
    },
    // Note on Anirudh Asokan: The NMIT source page lists both CSE and ISE for this alumnus; CSE is shown here.
    {
      id: 'anirudh-asokan',
      name: 'Anirudh Asokan',
      dept: 'B.E. Computer Science & Engineering',
      batch: '2013',
      role: 'Software Engineer, Google',
      bio: 'Software Engineer at Google; former co-founder and CTO of Havstruck Solutions Pvt Ltd. (Note: NMIT source page lists both CSE and ISE for this alumnus).'
    },
    {
      id: 'roshan-sah',
      name: 'Roshan Sah',
      dept: 'B.E. Aeronautical Engineering',
      batch: '2013-2017',
      role: 'Space Researcher, TCS Research',
      bio: 'Space Researcher in the Space Systems Research Area at TCS Research, Bangalore; M.Tech Aerospace Engineering from IIT Kharagpur; author of 25+ research papers and patents; received Ph.D. admission offer from University of Texas at Arlington.'
    },
    {
      id: 'sharath-appaiah',
      name: 'Sharath Appaiah',
      dept: 'B.E. Computer Science & Engineering',
      batch: '2004-2009',
      role: 'Co-Founder, Trebound & Monk Mantra',
      bio: 'Co-founder of Trebound (outdoor training and team building) and Monk Mantra (digital marketing).'
    }
  ]
};
