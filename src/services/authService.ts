import type { User, LoginPayload, RegisterPayload } from "../features/user/models";

// Data dummy awal (anggap sebagai database sementara)
const users: User[] = [
  {
    id: "1",
    fullName: "Budi Santoso",
    email: "budi@example.com",
    password: "password123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    fullName: "Siti Aminah",
    email: "siti@example.com",
    password: "rahasia456",
    createdAt: new Date().toISOString(),
  },
];

// Simulasi delay seperti API call
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(payload: LoginPayload): Promise<User | null> {
    await simulateDelay(500);
    const foundUser = users.find(
      u => u.email === payload.email && u.password === payload.password
    );
    return foundUser || null;
  },

  async register(payload: RegisterPayload): Promise<User> {
    await simulateDelay(500);
    const newUser: User = {
      id: String(users.length + 1),
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },

  // Untuk melihat semua user (debug)
  getAllUsers(): User[] {
    return users;
  }
};

export const loginWithGoogle = async (credential: string) => {
  // Kirim credential ke backend untuk verifikasi
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  if (!res.ok) {
    throw new Error("Google login failed");
  }

  return res.json();
};

