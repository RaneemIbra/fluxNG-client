import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { DocumentState, DocumentItem } from '../interfaces/document.interface';
import { DocumentService } from '../services/document';
import { SupabaseService } from '@flux-client/app/db/supabase';

const initialState: DocumentState = {
  activeDocument: null,
  isLoading: false,
  error: null,
};

export const DocumentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods(
    (
      store,
      apiService = inject(DocumentService),
      supabaseService = inject(SupabaseService),
    ) => ({
      loadDocumentById: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((id) =>
            apiService.getDocumentById(id).pipe(
              tap((document) =>
                patchState(store, {
                  activeDocument: document,
                  isLoading: false,
                }),
              ),
              catchError((err) => {
                patchState(store, { error: err.message, isLoading: false });
                return of(null);
              }),
            ),
          ),
        ),
      ),

      async uploadAndSave(
        title: string,
        bucket: string,
        path: string,
        file: File,
      ): Promise<void> {
        patchState(store, { isLoading: true, error: null });
        try {
          const uploadResult = await supabaseService.client.storage
            .from(bucket)
            .upload(path, file);
          if (uploadResult.error) throw uploadResult.error;

          apiService
            .saveDocumentMetaData(title, uploadResult.data.path)
            .subscribe({
              next: (savedRecord) => {
                patchState(store, {
                  activeDocument: savedRecord,
                  isLoading: false,
                });
              },
              error: (err) =>
                patchState(store, { error: err.message, isLoading: false }),
            });
        } catch (err: any) {
          patchState(store, {
            error: err.message || 'Upload lifecycle aborted',
            isLoading: false,
          });
        }
      },
    }),
  ),
);
