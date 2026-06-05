export interface DocumentItem {
  id: string;
  title: string;
  file_url: string;
  created_at: string;
}

export interface DocumentState {
  activeDocument: DocumentItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  activeDocument: null,
  isLoading: false,
  error: null,
};
