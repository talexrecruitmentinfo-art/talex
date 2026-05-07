import { type Job } from '@/types/job';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Hospitality Supervisor',
    company: 'True North Staffing',
    salary: 'CA$ 18,000 - 25,000/year',
    province: 'Ontario',
    category: 'Hospitality',
    experience: '2+ years',
    deadline: '2026-06-10',
    type: 'Full-time',
    location: 'Toronto, ON',
    description:
      'Work with a trusted Canadian hospitality employer to support guest services, team coordination, and operations.' ,
    requirements: [
      'Minimum 2 years hospitality or hotel operations experience.',
      'Fluent English communication skills.',
      'Open to relocation and work permit sponsorship.',
    ],
    benefits: [
      'Visa sponsorship support',
      'Accommodation assistance',
      'Competitive pay with overtime options',
    ],
    sponsored: true,
  },
  {
    id: '2',
    title: 'IT Support Specialist',
    company: 'Maple Cloud Services',
    salary: 'CA$ 16,000 - 21,000/year',
    province: 'British Columbia',
    category: 'Information Technology',
    experience: '1+ years',
    deadline: '2026-06-18',
    type: 'Full-time',
    location: 'Vancouver, BC',
    description:
      'Join a fast-growing IT team to manage helpdesk tickets, hardware support, and cloud services for Canadian clients.',
    requirements: [
      'Technical support background.',
      'Basic networking and Windows/macOS troubleshooting.',
      'Customer-focused mindset.',
    ],
    benefits: [
      'Visa sponsorship',
      'Health insurance package',
      'Professional development.',
    ],
    sponsored: true,
  },
  {
    id: '3',
    title: 'Construction General Labourer',
    company: 'Prairie Build Ltd.',
    salary: 'CA$ 13,000 - 17,500/year',
    province: 'Alberta',
    category: 'Construction',
    experience: '0-1 years',
    deadline: '2026-06-30',
    type: 'Full-time',
    location: 'Calgary, AB',
    description:
      'Support construction teams on residential and light-commercial builds with equipment handling and site preparation.',
    requirements: [
      'Physical fitness and strong work ethic.',
      'Ability to follow safety guidelines.',
      'Willingness to relocate for the assignment.',
    ],
    benefits: [
      'Visa sponsorship',
      'Weekly pay',
      'Inclusive team culture',
    ],
    sponsored: false,
  },
];

export const featuredJobs = jobs.slice(0, 2);
