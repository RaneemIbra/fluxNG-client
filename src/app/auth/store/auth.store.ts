import { inject, computed } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { AuthState, UserCredentials } from '../interfaces/auth.interface';

const initialState: AuthState = {
  user: null,
  sessionToken: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
    userEmail: computed(() => user()?.email || null),
  })),

  withMethods((store, authApi = inject(AuthService)) => ({
    async initializeAuth(): Promise<void> {
      patchState(store, { isLoading: true });
      const user = await authApi.getCurrentUser();
      const token = await authApi.getFreshSessionToken();
      patchState(store, { user, sessionToken: token, isLoading: false });
    },

    async registerUser(credentials: UserCredentials): Promise<void> {
      patchState(store, { isLoading: true, error: null });
      const { data, error } = await authApi.signUp(credentials);

      if (error) {
        patchState(store, { error: error.message, isLoading: false });
      } else {
        patchState(store, { user: data.user, isLoading: false });
      }
    },

    async loginUser(credentials: UserCredentials): Promise<void> {
      patchState(store, { isLoading: true, error: null });
      const { data, error } = await authApi.signIn(credentials);

      if (error) {
        patchState(store, { error: error.message, isLoading: false });
      } else {
        patchState(store, {
          user: data.user,
          sessionToken: data.session?.access_token || null,
          isLoading: false,
        });
      }
    },

    async logoutUser(): Promise<void> {
      patchState(store, { isLoading: true });
      const { error } = await authApi.signOut();

      if (error) {
        patchState(store, { error: error.message, isLoading: false });
      } else {
        patchState(store, initialState);
      }
    },
  })),
);
