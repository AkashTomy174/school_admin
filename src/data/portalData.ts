export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  gender: 'M' | 'F';
  age: number;
  dob: string;
  type: 'Day Scholar' | 'Hostel Boarder';
  grade: string;
  section: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  attendanceRate: number;
  academicStatus: 'Honors (A1)' | 'Proficient (B1)' | 'Academic Watch (C2)' | 'Remedial Support';
  portalSync: 'Active' | 'Pending Parent Activation';
  avatarUrl: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  personalEmail?: string;
  phone: string;
  emergencyContact?: string;
  address?: string;
  gender?: string;
  dob?: string;
  bloodGroup?: string;
  aadhaar?: string;
  role: string;
  department: string;
  assignedSubjects: string[];
  classTeacherFor: string | null;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatarUrl: string;
  qualifications?: string;
  tenure?: string;
  reportingAuthority?: string;
  weeklyLoadHours?: number;
}

export interface PermissionRow {
  module: string;
  description: string;
  icon: string;
  superAdmin: { text: string; type: 'full' | 'conditional' | 'restricted' };
  academicAdmin: { text: string; type: 'full' | 'conditional' | 'restricted' };
  teacher: { text: string; type: 'full' | 'conditional' | 'restricted' };
  officeStaff: { text: string; type: 'full' | 'conditional' | 'restricted' };
}

export interface CohortHealthRecord {
  classDivision: string;
  enrolled: number;
  classTeacher: string;
  teacherInitials: string;
  attendancePct: number;
  avgExamScore: number;
  atRiskCount: number;
  healthStatus: 'Optimal' | 'Stable' | 'Needs Attention';
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'PV-2022-1048',
    rollNumber: '14',
    name: 'Aarav Sharma',
    gender: 'M',
    age: 15,
    dob: '12-Nov-2010',
    type: 'Day Scholar',
    grade: 'Grade 10',
    section: 'A',
    guardianName: 'Sunil Sharma',
    guardianRelation: 'Father',
    guardianPhone: '+91 98450 11223',
    attendanceRate: 96.8,
    academicStatus: 'Honors (A1)',
    portalSync: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsp7hvUmOEn5ThP_9M4PqnqH1AyPbvL2Gv5KYtvJLFdhp9iv2aENUF0o2nw8QyByW_Cyo3RmTm2FHHab1J7F6g3uY4jT9EtX6F1LeMUQgGVJspMmWPFfRqf9u1I5_TSkv8u9ZNj-DjAD-YcL7Jd6zJ10d1atI-QyAsgnWvbilF0QtPWctrxay0LktpmHr1rmZfBqU1rTZFU80ELZ4__fwEZ89PEcWJm_Gwfs87UiKRqRnpY6yBf7f4'
  },
  {
    id: 'PV-2022-1089',
    rollNumber: '21',
    name: 'Diya Nambiar',
    gender: 'F',
    age: 15,
    dob: '05-Mar-2011',
    type: 'Day Scholar',
    grade: 'Grade 10',
    section: 'A',
    guardianName: 'Maya Nambiar',
    guardianRelation: 'Mother',
    guardianPhone: '+91 97412 88401',
    attendanceRate: 98.4,
    academicStatus: 'Honors (A1)',
    portalSync: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqW5W6Lvr8nio_YPZ-VJ4HWkdUiqHOgUVoU0Yb-Yv-ZPINGyZgVacGqI7t1s9zQ5LYwGa8vvDfNk-SnTdBW3EK3c7gKNymF5s5a7YzG9NFgl7m9w5mvoGreWd-EcXn-aGKdV4tHTYKI3vUQsOZkssXtwKYJlGpcnFYN8DrHDLEyFa9_gEd98r2eTU5xuhLmtwypiGqMexoSSpcoHLQ9bsbk15VP3qpqj5bNCG02q0LQunpX-p0Dcsx'
  },
  {
    id: 'PV-2022-1102',
    rollNumber: '33',
    name: 'Rohan V. Kurup',
    gender: 'M',
    age: 16,
    dob: '18-Jan-2010',
    type: 'Hostel Boarder',
    grade: 'Grade 10',
    section: 'A',
    guardianName: 'Vinod Kurup',
    guardianRelation: 'Father',
    guardianPhone: '+91 94471 20984',
    attendanceRate: 88.2,
    academicStatus: 'Academic Watch (C2)',
    portalSync: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa8iM06Z4BhMMKgJwkyaJhj_I0hnzpCefykGpDTmSq7IbvglZHbLq6-jM3sU-HyUksf0OrScksFaNEa2kdndAToKQPSmiksmQMxEc7myalsRdOAqHQcR9tE6IFcOzTMqUu-Yxsk7xtuX8fHaAI-0uERsvuk-5a0yf96T8fIGRU_fs0qW1MakraWPQ-MRzZo4GYigkjtNshhqLloFasKsgBEspJH3zueD8nmllzePKYl4rMSFuYKfSE'
  },
  {
    id: 'PV-2022-1012',
    rollNumber: '03',
    name: 'Ananya S. Pillai',
    gender: 'F',
    age: 15,
    dob: '29-Sep-2010',
    type: 'Day Scholar',
    grade: 'Grade 10',
    section: 'B',
    guardianName: 'S. Pillai',
    guardianRelation: 'Father',
    guardianPhone: '+91 94960 44321',
    attendanceRate: 99.1,
    academicStatus: 'Honors (A1)',
    portalSync: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSr3Ox9ha_Y7J3sInPE9aMtwFkpo6wdWya1fDFN2VORoJLIoaAm4XqVKZcNh_JRahXqbq1c9TFITyBc0ejvCon7udDpEJG6nAjh0tRWi562ZL3sVTaxYA8MW8CU4zW6DS1pg2FcWoHqmGmxKQKynTnjU81oXxqaNZexSWZu5-XwXrtGn3vjnPNsU5NKNaGvaMu_GuFetOZEncan_7DNEN7zS9OqrdJpgXgR6AjKlHT6TguJoCXCDX2'
  },
  {
    id: 'PV-2022-1055',
    rollNumber: '17',
    name: 'Mohammed Farhan',
    gender: 'M',
    age: 15,
    dob: '14-Jul-2010',
    type: 'Day Scholar',
    grade: 'Grade 10',
    section: 'B',
    guardianName: 'Tariq Farhan',
    guardianRelation: 'Father',
    guardianPhone: '+91 98800 66219',
    attendanceRate: 92.0,
    academicStatus: 'Proficient (B1)',
    portalSync: 'Active',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3dXN7LP0MzEUK4N_ohi8iVu73LXE9UZlpdfFnhE7-46DpfDyQGEsVSegrn9YaELVD0SKWmMmFwwp31W_n3ZoORuNN1_xH2V-RlhuvQ3dfKTL_NXMo_NiQhz0Ub2F6l8oGjh15JZEGt50ZFufqyWrGic4KPIwoqhTG_ylHFKaTeKyENIkFFvyoj2LQa98EKfsHjimwHrdGSNRTNDugs780V7YwlqjTPaOYKoC-xLthYA2liiCDi3bz'
  },
  {
    id: 'PV-2022-1077',
    rollNumber: '28',
    name: 'Sara Elizabeth',
    gender: 'F',
    age: 15,
    dob: '02-Feb-2011',
    type: 'Day Scholar',
    grade: 'Grade 10',
    section: 'C',
    guardianName: 'Thomas Elizabeth',
    guardianRelation: 'Father',
    guardianPhone: '+91 94460 77123',
    attendanceRate: 94.5,
    academicStatus: 'Proficient (B1)',
    portalSync: 'Pending Parent Activation',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkPwd063AnprTt5yecSbhrFpUWWl2VEIMsnOkogwiHL0kHsT-C9z5BJrkhDrbFjat3fQHctHsaFYMzsFHIyyRdOpsbtMbLUUX5quknCVyUJQPhyHAkhTPXG6i-u7aqGQxtmP8O206wA4TIek5cejK5G-AiUWqVfIGeJT8iYFRWVjTPm3aH4xwxARiNs17zOL_hS49zwU7ahiEsfehh1dSRbGY-6FKPUVCCYmoGcWwPPC-VXiYi37Bu'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'EMP-2019-014',
    name: 'Anjali Menon',
    email: 'anjali.menon@peevees.edu.in',
    personalEmail: 'anjali.menon.maths@gmail.com',
    phone: '+91 98470 12345',
    emergencyContact: 'Dr. K. Menon - Spouse - +91 98470 54321',
    address: 'Flat 4B, Emerald Residency, Nilambur Road, Manjeri, Malappuram District, Kerala - 676121',
    gender: 'Female',
    dob: '14 May 1988',
    bloodGroup: 'O+ (Positive)',
    aadhaar: '•••• •••• 9842',
    role: 'Teacher (PGT)',
    department: 'Mathematics',
    assignedSubjects: ['Grade 10-A', 'Grade 11-B'],
    classTeacherFor: 'Grade 10-A',
    joiningDate: '12 Jun 2019',
    status: 'Active',
    qualifications: 'M.Sc. Mathematics, B.Ed.',
    tenure: '6 yrs 9 mos',
    reportingAuthority: 'Meera Joseph - Academic Dean',
    weeklyLoadHours: 15,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOr3CNOHoxPvHr5HeGkwPbAKajPEyHIkfMW-f2U44XgasM588hl2lEm0TKcbT0mfz7qr4a3kH4fbcQGOs1Oek45-ltwKE4x4sLcv7-rMPxHZUwv019iteTukxTVe4X80U7DxP7L_AAbTj3NPwAeX9PCyb2Yu3t95zIg_tfWQ5WkKO30zf4Y9gtUhH7w3T009N_9DGkkfpd6YJ8PE4n2t_iFZVRkmvsc_oe8RR2GWKWpvlxeFlcsh-6'
  },
  {
    id: 'EMP-2021-032',
    name: 'Rahul Thomas',
    email: 'rahul.thomas@peevees.edu.in',
    phone: '+91 98470 23456',
    role: 'Teacher (TGT)',
    department: 'Science (Physics)',
    assignedSubjects: ['Grade 9-A', 'Grade 9-B', 'Grade 10-B'],
    classTeacherFor: 'Grade 9-B',
    joiningDate: '18 Aug 2021',
    status: 'Active',
    qualifications: 'M.Sc. Physics, B.Ed.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbJoFX4KskSPdYC3BkvjPwvgiWmh8cW7pPfy36mQy1RcrV1LkqIGNkJrkpvKzPeVncknyVpwUf6ysV_iSVl1CFV4XdpQdAWDZbA0NF17VMmiSkIjyQmh9sVPuwaSR6Bf94u0tNn26f7_9lpVHH70wjLyx5uysvMZ6JF9z8MHRX_uJ32y2JuVEycgjZSvH2w4OafwVgrnw4bnKbKhE7Vc0sKPg0EhLEK2ze6l6NgOS309-P6BRik_IM'
  },
  {
    id: 'EMP-2017-008',
    name: 'Meera Joseph',
    email: 'meera.joseph@peevees.edu.in',
    phone: '+91 98470 34567',
    role: 'Head of Department',
    department: 'English Literature',
    assignedSubjects: ['Grade 11-A', 'Grade 12-A'],
    classTeacherFor: null,
    joiningDate: '04 Jan 2017',
    status: 'Active',
    qualifications: 'M.A. English Literature, M.Phil',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiFXs4CFhlxEvrr2lkI8o7xhXqXUGpofyGg948glDTZ8RuCAxC6JLayo_HMOG4Q9PNUDRykJRUsFhDb8A-6WhB_mNEdPby6xF8NbeFzdk3iiPa93YYa2DIWkoWRhDuIRI9jY3EUdS-EkYOL7pOkB5U596s-GfWtCnocqRidSw0hTU2C6jztev3i9pNf8VIzCYDi79ufpAaD21gBf5_lXQ5r_bwRFiRfbet7smbJazDIyPM6aObbrFq'
  },
  {
    id: 'EMP-2020-055',
    name: 'Arun Kumar',
    email: 'arun.kumar@peevees.edu.in',
    phone: '+91 98470 45678',
    role: 'Senior Office Superintendent',
    department: 'Administration',
    assignedSubjects: ['Admissions & Fees'],
    classTeacherFor: null,
    joiningDate: '10 Feb 2020',
    status: 'Active',
    qualifications: 'MBA, B.Com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiBR7T3qjKgw1djBBmzGgYicTaFz_03Ufc3C_Gv48HOjVsHepFKawsImmJW5S5IGvAGmHpgyuFTNL1rFoyVFcCa_7hSs2UxgruO8MX2FYo1doXsRL1LqAN7MsXEU0FuGfNPuU5DPvV6xc64ICQ440NHfJtNPVRG3wKk3Xm9hbSOSJjNdav-jfV62rna5IVZ3V8EOlq1zf8WpFQqhq_K9Ns3yDP0ZhQ1FowBTFWyXZsO37ccxyIYJYM'
  },
  {
    id: 'EMP-2022-067',
    name: 'Priya Nair',
    email: 'priya.nair@peevees.edu.in',
    phone: '+91 98470 56789',
    role: 'Teacher (PGT)',
    department: 'Computer Science',
    assignedSubjects: ['Grade 11-B', 'Grade 12-B'],
    classTeacherFor: 'Grade 12-B',
    joiningDate: '15 Jul 2022',
    status: 'Active',
    qualifications: 'M.Tech CSE, B.Ed.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4mitTQB1u-eCA6NKVrmEvjecZ6Jk9nGUwf2FJogXG4ZPiOOHECZQ7eXQzk3aGNPuAlC4F__4UzTZIFsYY3jkqCH28wQdydCJJvrT65Rwf26iTXZuLEWxouIkTV1929L62rTSuKTQuIP3tNAYIYOA0MO5bTsD_d6ruxi3W4fsXF4CMlNKNQanJ-hdwqnLPVWfcear7Wt_oE2v-AlPF3PiQujG1HgDNXUbAljaOZr9aclZKSePUjDH'
  },
  {
    id: 'EMP-2016-003',
    name: 'Rajesh Varma',
    email: 'rajesh.varma@peevees.edu.in',
    phone: '+91 98470 67890',
    role: 'Senior Teacher',
    department: 'Social Science',
    assignedSubjects: ['Grade 8-A', 'Grade 8-B'],
    classTeacherFor: 'Grade 8-A',
    joiningDate: '01 Jun 2016',
    status: 'On Leave',
    qualifications: 'M.A. History, B.Ed.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYgtWaa6Jt1dFOjN29JOKDvy4vl6yamJQM5uMRSNb5Y-z1vN-09DgJNDU-eLaeAv3svqs3HkIV1M2zzAX8tlkyh7Y1Q9_bkDB14ie7EA25-c0UpypgWnca3wORHWtNepxiSv6H5woJtkYZPgOa3FwlQIgNeppyU91EG-KIf9iV202dVDiou5tLZSOJKgm-27tZR1s1ftEPSO30rlfIqX7759LG0Vmn4SJvZKBuHNc0xrrDFzhCOGx'
  },
  {
    id: 'EMP-2023-089',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@peevees.edu.in',
    phone: '+91 98470 78901',
    role: 'Teacher (PRT)',
    department: 'Mathematics',
    assignedSubjects: ['Grade 4-A', 'Grade 5-B'],
    classTeacherFor: 'Grade 4-A',
    joiningDate: '14 Mar 2023',
    status: 'Active',
    qualifications: 'B.Sc. Mathematics, D.El.Ed.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7YQ_fjTDZMZZ0kcB6dIvvi9E0lxzw6hWuXsrmUz2xoqm3gwLPynvq-oKPo82p15S9BDYk887xXntzgMoLJbznjAJqnC-zhbAzbWj6g-KL9Kf6flKi2JysXBvOBKAb9EkCjK-o2Ztyema0q-WSMvm0yW-zeO688Y6--pmYQSmhMnP7jLGpYJdTUdQ5oqm6H-u7IrDvVZpmgRV1Zpx0zgZHB9iDyyCcR0rqH29hI79W3LucMWX4PgWo'
  },
  {
    id: 'EMP-2015-002',
    name: 'David Fernandez',
    email: 'david.fernandez@peevees.edu.in',
    phone: '+91 98470 89012',
    role: 'Teacher (TGT)',
    department: 'Physical Education',
    assignedSubjects: [],
    classTeacherFor: null,
    joiningDate: '10 Jan 2015',
    status: 'Inactive',
    qualifications: 'M.P.Ed.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm9xdG203gVibrwR-4Ov891RxaI3BGap4pEls6jp7RkUFiI-HrKF5HFhXY53sKagzR3s8ScOWU6Fux_LqEo8Vb4q0H7396GhuHQtxicAR6-VpsvC3BsqZg3exMwJH6a2-hLe7AQuqBbVcP_lzhtR4qQOjNcYEW-onn0z4i51II_4Jju1nqoxjU0xxbKaZwDflAq9Gupp3IAAZDbdsQ-D1TAeBCnzKjaBgdmjViBI5pdEBXJTOBcZx4'
  }
];

export const PERMISSIONS_DATA: PermissionRow[] = [
  {
    module: 'Student Records & Bio-Data',
    description: 'Enrolment profiles, residential data, medical forms, parent contacts',
    icon: 'school',
    superAdmin: { text: 'Full Control', type: 'full' },
    academicAdmin: { text: 'Full Control', type: 'full' },
    teacher: { text: 'View Only', type: 'conditional' },
    officeStaff: { text: 'Edit / Update', type: 'conditional' }
  },
  {
    module: 'Staff & Faculty Management',
    description: 'Payroll registers, appointment letters, performance dossiers, leave ledgers',
    icon: 'badge',
    superAdmin: { text: 'Full Control', type: 'full' },
    academicAdmin: { text: 'View Only', type: 'conditional' },
    teacher: { text: 'No Access', type: 'restricted' },
    officeStaff: { text: 'No Access', type: 'restricted' }
  },
  {
    module: 'Attendance & Leave Reconciliation',
    description: 'Biometric syncing, excuse notes, period-wise roll calls, SMS dispatch',
    icon: 'co_present',
    superAdmin: { text: 'Full Control', type: 'full' },
    academicAdmin: { text: 'Full Control', type: 'full' },
    teacher: { text: 'Assigned Classes Only', type: 'conditional' },
    officeStaff: { text: 'Record Daily Excuses', type: 'conditional' }
  },
  {
    module: 'Gradebook & Exam Marks Entry',
    description: 'Summative assessments, CBSE report cards, grade normalization, moderation',
    icon: 'fact_check',
    superAdmin: { text: 'Full Control & Signoff', type: 'full' },
    academicAdmin: { text: 'Approve & Publish', type: 'full' },
    teacher: { text: 'Input Subject Marks', type: 'conditional' },
    officeStaff: { text: 'No Access', type: 'restricted' }
  },
  {
    module: 'Institutional Billing, Gateways & API Keys',
    description: 'Razorpay webhook secrets, WhatsApp Business API, AWS backups, audit logs',
    icon: 'database',
    superAdmin: { text: 'Full Control', type: 'full' },
    academicAdmin: { text: 'Restricted', type: 'restricted' },
    teacher: { text: 'Restricted', type: 'restricted' },
    officeStaff: { text: 'Restricted', type: 'restricted' }
  }
];

export const COHORT_HEALTH_DATA: CohortHealthRecord[] = [
  {
    classDivision: 'Grade 12 - Section A (PCM)',
    enrolled: 38,
    classTeacher: 'Dr. Anjali Sharma',
    teacherInitials: 'AS',
    attendancePct: 97.8,
    avgExamScore: 88.4,
    atRiskCount: 0,
    healthStatus: 'Optimal'
  },
  {
    classDivision: 'Grade 12 - Section B (PCB)',
    enrolled: 36,
    classTeacher: 'Mr. Rajesh Kumar',
    teacherInitials: 'RK',
    attendancePct: 96.9,
    avgExamScore: 86.2,
    atRiskCount: 1,
    healthStatus: 'Optimal'
  },
  {
    classDivision: 'Grade 10 - Section A',
    enrolled: 42,
    classTeacher: 'Mrs. Sunita Patel',
    teacherInitials: 'SP',
    attendancePct: 96.5,
    avgExamScore: 84.7,
    atRiskCount: 2,
    healthStatus: 'Stable'
  },
  {
    classDivision: 'Grade 9 - Section B',
    enrolled: 40,
    classTeacher: 'Mr. V. Narayanan',
    teacherInitials: 'VN',
    attendancePct: 89.4,
    avgExamScore: 74.1,
    atRiskCount: 11,
    healthStatus: 'Needs Attention'
  },
  {
    classDivision: 'Grade 8 - Section A',
    enrolled: 41,
    classTeacher: 'Mrs. Teresa Mathew',
    teacherInitials: 'TM',
    attendancePct: 94.3,
    avgExamScore: 82.9,
    atRiskCount: 3,
    healthStatus: 'Stable'
  }
];

export const SCHOOL_CREST_LOGO = "https://lh3.googleusercontent.com/aida/AEtjO1VuUKyEfPyl73FzSsEOWvEQrN80Y8CTfG8ItRnOlvBAvUdgeT_JEBmqNNtAdm2sMJAxVh5rPAkQ4cA30nSmsEfYI6qS1fg4X37WqDhGe2VloJv8g6DNWQXoqEk77BbBmFcT86WvWMlMsP57FxgRXvMq5mFYf7dQasHDhzc4QD3hZb9qTfaavVIvpoGFWHwMD_ChsqNtEKZj1vql1IhdQ3dRolycGm79Z8hGYV2IBYzpPHcqb_i2Ztnr-6Y";

export const CAMPUS_QUADRANGLE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuATJCrE872bvcshcQx3UI0JtHdTTDqiQB0fG5Luadsrq6n7A5kDIq54WBFDs_yr24jaNx48pGbj9_qod2_WjCuvumZfLYUhnokVVhzYWJmwUWntC4kHULPcL7xANMgOmvKNnIcz1m_SJAVRmcPbIYtwAHiFIiAObBWxbWGk3d6pgLf2AsVEw2p-MVKfG-SoG2XeLllEpUvkPpkcbhSKxOsRfzlMfCe68cpnCiB-gL_L7svxaQi5iKaN";

export const CAMPUS_ASSEMBLY_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD6jOviQDyOsO_6V7hhZ4HdmH7Bg601McW-Py-UVeqEzr-HeqmK9Xsoo4t9ZCzZ1hOHvSm0rLFoMpyYgTQZ2Md8vLLoEEhQtSu0ed3z2sD2TKdXPZP9iZ9oeAMZoJR_5uJPx8t0OYhAi3MH7w87bBHdYLZyR6gGz782ltK6sOWHw5Qo_-B4U9cN9fda-fdp5WIQaNLwLyvHLehcKI752sBttH4IFPkMVmLzFMih8f4xRBse_CIBXwm2";

export const CAMPUS_ACADEMIC_WING_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDwvsdUZquPlVGU1UBP3u6uM4wDPmTWIiQYpmkp6XycM5Tu6SpGPzSlp4TWHCLvVqll-gg8Z2EioROb0X3SeY9z5w5iYs_Hw1E6ZSVpFbH-RmhUHRu7HcsAvDkn-Ti7IwnP-zGGG7ZPR-t1EiQQSsRg1zV0zYZIR2_j4ULQUp2DTNypiura0BbbpyH7hnPH8SlwLAekq5haGyLzawSzO2Be4SJoC281IkP116yenhGugtHn3lQ9kF4i";
