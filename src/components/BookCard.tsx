
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
}

const BookCard = ({ book, onEdit }: BookCardProps) => {
  const getStockStatus = () => {
    if (book.quantity <= 5) return { label: "Low Stock", className: "bg-red-100 text-red-800" };
    if (book.quantity <= 20) return { label: "Medium Stock", className: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", className: "bg-green-100 text-green-800" };
  };

  const status = getStockStatus();

  return (
    <Card className="w-full h-full transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
          <span className="text-sm text-muted-foreground">ISBN: {book.isbn}</span>
        </div>
        <h3 className="font-semibold text-lg leading-none tracking-tight">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <span className="font-medium">{book.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">${book.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          onClick={() => onEdit(book)}
        >
          Edit Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
