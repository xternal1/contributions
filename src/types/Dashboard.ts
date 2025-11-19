export type Gender = "male" | "female";
export type ZoomStatus = "active" | "completed";
export type StatisticStatus = "completed" | "pending" | "missed";
export type IconType = "book" | "library" | "puzzle" | "event" | "trophy";
export interface SummaryCard {
  title: string;
  value: number;
  iconType: IconType;
}

export interface ZoomScheduleItem {
  id: number;
  title: string;
  date: string;
  time: string;
  status: ZoomStatus;
}

export interface BillingData {
  period: string;
  totalAmount: string;
  warningMessage: string;
}

export interface StatisticItem {
  label: string;
  value: number;
  status: StatisticStatus;
}

export interface StatisticCategory {
  title: string;
  subtitle: string;
  items: StatisticItem[];
}

export interface StatisticsData {
  tugas: StatisticCategory;
  tantangan: StatisticCategory;
}

// Component Props Types
export interface DashboardHeaderProps {
  name: string;
  gender: Gender;
  loading: boolean;
}

export interface SummaryCardsProps {
  cards: SummaryCard[];
  loading: boolean;
}

export interface BillingSectionProps {
  data: BillingData;
  loading: boolean;
}

export interface ZoomScheduleProps {
  schedule: ZoomScheduleItem[];
  loading: boolean;
}

export interface StatisticsSectionProps {
  data: StatisticsData;
  loading: boolean;
}

export interface DashboardIndustryProps {
  name?: string;
  gender?: Gender;
}