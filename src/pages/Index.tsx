
import React, { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import BookCard from '@/components/BookCard';
import BookForm from '@/components/BookForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from '@/services/api';
import { toast } from 'sonner';

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await api.getBooks();
      setBooks(data);
    } catch (error) {
      toast.error('Failed to load books');
      console.error('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData: Partial<Book>) => {
    try {
      const newBook = await api.addBook(bookData as Omit<Book, 'id'>);
      setBooks([...books, newBook]);
      setIsDialogOpen(false);
      toast.success('Book added successfully!');
    } catch (error) {
      toast.error('Failed to add book');
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = async (bookData: Partial<Book>) => {
    if (!selectedBook) return;
    
    try {
      const updatedBook = await api.updateBook(selectedBook.id, bookData);
      setBooks(books.map(book => 
        book.id === selectedBook.id ? updatedBook : book
      ));
      setIsDialogOpen(false);
      setSelectedBook(undefined);
      toast.success('Book updated successfully!');
    } catch (error) {
      toast.error('Failed to update book');
      console.error('Error updating book:', error);
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
  const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);

  if (isLoading) {
    return (
      <div className="container py-8 mx-auto text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto animate-fade-in">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Bookstore Inventory</h1>
          <p className="text-muted-foreground">Manage your book inventory efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-card rounded-lg shadow-sm">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Total Books</p>
            <p className="text-3xl font-bold">{totalBooks}</p>
          </div>
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button
            onClick={() => {
              setSelectedBook(undefined);
              setIsDialogOpen(true);
            }}
            className="whitespace-nowrap"
          >
            Add New Book
          </Button>
        </div>

        <ScrollArea className="h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
              />
            ))}
            {filteredBooks.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  {books.length === 0
                    ? "No books in inventory. Add some books to get started!"
                    : "No books match your search."}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedBook ? "Edit Book" : "Add New Book"}
              </DialogTitle>
            </DialogHeader>
            <BookForm
              onSubmit={selectedBook ? handleEditBook : handleAddBook}
              initialData={selectedBook}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
