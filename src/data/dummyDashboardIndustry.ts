// src/data/dashboardData.js

export const summaryCards = [
  { 
    title: "Jumlah Tugas", 
    value: 26, 
    iconType: "book" 
  },
  { 
    title: "Jumlah Materi", 
    value: 26, 
    iconType: "library" 
  },
  { 
    title: "Jumlah Tantangan", 
    value: 26, 
    iconType: "puzzle" 
  },
  { 
    title: "Jumlah Event", 
    value: 26, 
    iconType: "event" 
  },
  { 
    title: "Jumlah Point", 
    value: 26, 
    iconType: "trophy" 
  },
];

export const zoomSchedule = [
  {
    id: 1,
    title: "Zoom Designer Blasasib Lorem Ipsum osdhfsiuhdfibsifisdgfis dsibudbsus usubhf",
    date: "20 Maret 2025",
    time: "10:00 WIB - 11:00 WIB",
    status: "active", // active | completed
  },
  {
    id: 2,
    title: "JavaScript",
    date: "20 Maret 2025",
    time: "13:00 WIB - 14:00 WIB",
    status: "active",
  },
  {
    id: 3,
    title: "Evaluasi",
    date: "20 Maret 2025",
    time: "07:00 WIB - 07:30 WIB",
    status: "completed",
  },
];

export const billingData = {
  period: "Jan 2025 - Mar 2025",
  totalAmount: "Jan 2025 - Mar 2025", // You might want to change this to an actual number
  warningMessage: "Selesaikan pembayaran sampai bulan ini ya, supaya fitur Kelas Industri tidak terkunci. Nominal yang harus kamu bayar tertera di bawah."
};

export const statisticsData = {
  tugas: {
    title: "Tugas",
    subtitle: "Statistik Tugas",
    items: [
      { label: "Sudah Dikerjakan", value: 20, status: "completed" },
      { label: "Belum Dikerjakan", value: 20, status: "pending" },
      { label: "Tidak Dikerjakan", value: 20, status: "missed" },
    ]
  },
  tantangan: {
    title: "Tantangan",
    subtitle: "Statistik Tantangan",
    items: [
      { label: "Sudah Dikerjakan", value: 20, status: "completed" },
      { label: "Belum Dikerjakan", value: 20, status: "pending" },
      { label: "Tidak Dikerjakan", value: 20, status: "missed" },
    ]
  }
};