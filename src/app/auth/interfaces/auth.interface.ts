import { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  sessionToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserCredentials {
  email: string;
  password: string;
}
