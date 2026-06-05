import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@flux-client/app/db/supabase';
import { from, Observable, switchMap } from 'rxjs';
import { DocumentItem } from '../interfaces/document.interface';
import { environments } from '@flux-client/app/environments/environements';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private http = inject(HttpClient);
  private supabase = inject(SupabaseService);

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.supabase.client.auth.getSession()).pipe(
      switchMap(({ data }) => {
        const token = data.session?.access_token || '';
        return [new HttpHeaders().set('Authorization', `Bearer ${token}`)];
      }),
    );
  }

  getDocumentById(id: string): Observable<DocumentItem> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<DocumentItem>(`${environments.baseUrl}/documents/${id}`, {
          headers,
        }),
      ),
    );
  }

  saveDocumentMetaData(
    title: string,
    fileUrl: string,
  ): Observable<DocumentItem> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.post<DocumentItem>(
          `${environments.baseUrl}/documents`,
          { title, file_url: fileUrl },
          { headers },
        ),
      ),
    );
  }
}
