import axios from "axios";
import { createContext, useState } from "react";

const BookContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };
  const editBookById = async (updateId, newTitle) => {
    const response = await axios.put(
      `http://localhost:3001/books/${updateId}`,
      {
        title: newTitle,
      }
    );
    const { id, title } = response.data;
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, title };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", { title });
    const book = response.data;
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
  };
  const value = { books, fetchBooks, editBookById, deleteBookById, createBook };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export default BookContext;
export { Provider };
