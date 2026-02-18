
import { Roommate, RentMember } from './types';

export const INITIAL_ROOMMATES: Roommate[] = [
  { id: '1', name: 'AL AMIN', joinDate: '2024-01-01', type: 'SHARED' },
  { id: '2', name: 'WAHAD', joinDate: '2024-01-01', type: 'SHARED' },
  { id: '3', name: 'MAHADI', joinDate: '2024-01-01', type: 'SHARED' },
  { id: '4', name: 'JAKARIA', joinDate: '2024-01-01', type: 'SHARED' },
  { id: '5', name: 'JAHID', joinDate: '2024-01-01', type: 'INDEPENDENT' },
];

export const INITIAL_RENT_MEMBERS: RentMember[] = [
  { id: 'r1', name: 'AL AMIN' },
  { id: 'r2', name: 'WAHAD' },
  { id: 'r3', name: 'MAHADI' },
  { id: 'r4', name: 'JAKARIA' },
  { id: 'r5', name: 'MOZNU' },
];

export const CATEGORIES = [
  'বাজার (Market)',
  'বিদ্যুৎ বিল (Electricity)',
  'ইন্টারনেট (Internet)',
  'গ্যাস বিল (Gas)',
  'অন্যান্য (Others)'
];
