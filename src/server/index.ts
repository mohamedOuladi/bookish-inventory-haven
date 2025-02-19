
import express from 'express';
import cors from 'cors';
import { Book } from '../types/book';

const app = express();
const port = 3001;

// In-memory storage for development purposes
// In a production environment, you'd want to use a proper database
let books: Book[] = [];

app.use(cors());
app.use(express.json());

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const newBook = {
    ...req.body,
    id: Date.now().toString(),
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...req.body,
    id,
  };

  res.json(books[bookIndex]);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books = books.filter(book => book.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
