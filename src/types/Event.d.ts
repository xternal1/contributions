interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  quota: number;
  registered: number;
  daysLeft: number;
  image: string;
  category: string;
  isOnline: boolean;
  location?: string;
  platform?: string;
  price: number;
  speakerName: string;
  speakerImage: string;
  rundown: {
    time: string;
    session: string;
    speaker: { name: string; role: string };
  }[];
};

export default Event
