package example.micronaut.api;

import io.micronaut.http.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Controller("/books")
public class BookController {

    private List<Book> books = new ArrayList<>();
    private AtomicLong idGenerator = new AtomicLong(1);

    @Get("/")
    public List<Book> listBooks() {
        return books;
    }

    @Post("/")
    public Book addBook(@Body Book book) {
        book.setId(idGenerator.getAndIncrement());
        books.add(book);
        return book;
    }

    @Put("/{id}")
    public Book updateBook(@PathVariable Long id, @Body Book updatedBook) {
        Optional<Book> existingBookOpt = books.stream().filter(book -> book.getId().equals(id)).findFirst();
        if (existingBookOpt.isPresent()) {
            Book existingBook = existingBookOpt.get();
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            return existingBook;
        }
        return null;
    }

    @Delete("/{id}")
    public void deleteBook(@PathVariable Long id) {
        books.removeIf(book -> book.getId().equals(id));
    }
}
