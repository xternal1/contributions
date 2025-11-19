// src/data/dashboardData.ts

import type { SummaryCard, ZoomScheduleItem, BillingData, StatisticsData } from "@/types/Dashboard";

export const summaryCards: SummaryCard[] = [
  { 
    title: "Jumlah Tugas", 
    value: 26, 
    iconType: "book" as const  // Beritahu TypeScript bahwa ini adalah 'book' secara literal dan bukan string 
  },
  { 
    title: "Jumlah Materi", 
    value: 26, 
    iconType: "library" as const
  },
  { 
    title: "Jumlah Tantangan", 
    value: 26, 
    iconType: "puzzle" as const
  },
  { 
    title: "Jumlah Event", 
    value: 26, 
    iconType: "event" as const
  },
  { 
    title: "Jumlah Point", 
    value: 26, 
    iconType: "trophy" as const
  },
];

export const zoomSchedule: ZoomScheduleItem[] = [
  {
    id: 1,
    title: "Zoom Designer Blasasib Lorem Ipsum osdhfsiuhdfibsifisdgfis dsibudbsus usubhf",
    date: "20 Maret 2025",
    time: "10:00 WIB - 11:00 WIB",
    status: "active" as const,
  },
  {
    id: 2,
    title: "JavaScript",
    date: "20 Maret 2025",
    time: "13:00 WIB - 14:00 WIB",
    status: "active" as const,
  },
  {
    id: 3,
    title: "Evaluasi",
    date: "20 Maret 2025",
    time: "07:00 WIB - 07:30 WIB",
    status: "completed" as const,
  },
];

export const billingData: BillingData = {
  period: "Jan 2025 - Mar 2025",
  totalAmount: "Jan 2025 - Mar 2025",
  warningMessage: "Selesaikan pembayaran sampai bulan ini ya, supaya fitur Kelas Industri tidak terkunci. Nominal yang harus kamu bayar tertera di bawah."
};

export const statisticsData: StatisticsData = {
  tugas: {
    title: "Tugas",
    subtitle: "Statistik Tugas",
    items: [
      { label: "Sudah Dikerjakan", value: 20, status: "completed" as const },
      { label: "Belum Dikerjakan", value: 20, status: "pending" as const },
      { label: "Tidak Dikerjakan", value: 20, status: "missed" as const },
    ]
  },
  tantangan: {
    title: "Tantangan",
    subtitle: "Statistik Tantangan",
    items: [
      { label: "Sudah Dikerjakan", value: 20, status: "completed" as const },
      { label: "Belum Dikerjakan", value: 20, status: "pending" as const },
      { label: "Tidak Dikerjakan", value: 20, status: "missed" as const },
    ]
  }
};