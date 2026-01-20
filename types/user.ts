export interface User {
  id: number;
  userId: number;
  fullName: string;
  bio: string;
  avatarUrl: string;
  phone: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProfileInput = {
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
  phone?: string;
  dateOfBirth?: string;
};
