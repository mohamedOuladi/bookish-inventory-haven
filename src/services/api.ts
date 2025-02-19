
import axios from 'axios';
import { Book } from '@/types/book';

const API_URL = 'http://localhost:3001/api';

export const api = {
  getBooks: async () => {
    const response = await axios.get<Book[]>(`${API_URL}/books`);
    return response.data;
  },

  addBook: async (book: Omit<Book, 'id'>) => {
    const response = await axios.post<Book>(`${API_URL}/books`, book);
    return response.data;
  },

  updateBook: async (id: string, book: Partial<Book>) => {
    const response = await axios.put<Book>(`${API_URL}/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: string) => {
    await axios.delete(`${API_URL}/books/${id}`);
  },
};
