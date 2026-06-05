import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/auth.interface';
import { SupabaseService } from '@flux-client/app/db/supabase';
import { AuthResponse, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);

  async signUp(credentials: UserCredentials): Promise<AuthResponse> {
    return await this.supabaseService.client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });
  }

  async signIn(credentials: UserCredentials): Promise<AuthResponse> {
    return await this.supabaseService.client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
  }

  async signOut(): Promise<{ error: any }> {
    return await this.supabaseService.client.auth.signOut();
  }

  async getFreshSessionToken(): Promise<string | null> {
    const { data } = await this.supabaseService.client.auth.getSession();
    return data.session?.access_token || null;
  }

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await this.supabaseService.client.auth.getUser();
    return user;
  }
}
