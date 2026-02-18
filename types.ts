
export type RoommateType = 'SHARED' | 'INDEPENDENT';

export interface Roommate {
  id: string;
  name: string;
  joinDate: string; // YYYY-MM-DD
  type: RoommateType;
}

export interface Expense {
  id: string;
  date: string;
  roommateName: string;
  amount: number;
  description: string;
  category: string;
}

export interface Deposit {
  id: string;
  roommateName: string;
  amount: number;
  month: string; // YYYY-MM format
}

export interface RoommateStat {
  totalSpent: number; // The actual money they paid out of pocket
  totalDeposit: number; // The money they handed to the manager/fund
  totalDue: number; // calculated share of expenses
  balance: number;
  isShared: boolean;
  joinDate: string;
}

// New types for Room Rent
export interface RentMember {
  id: string;
  name: string;
}

export interface RentPayment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  month: string; // YYYY-MM
  date: string;
}
