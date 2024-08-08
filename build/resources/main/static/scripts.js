document.addEventListener('DOMContentLoaded', function() {
    fetchBooks();
    document.getElementById('bookForm').addEventListener('submit', handleFormSubmit);
});

function fetchBooks() {
fetch('http://localhost:8080/books')
.then(response => response.json())
.then(books => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </td>
        `;
        bookList.appendChild(row);
    });
});
}


function handleFormSubmit(event) {
    event.preventDefault();
    document.getElementById('bookId').type = 'hidden';
    document.getElementById('submitButton').innerText = 'Add Book';
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const book = { title, author };

    if (id) {
        fetch(`http://localhost:8080/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(fetchBooks);
    } else {
        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).then(fetchBooks);
    }

    document.getElementById('bookId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
}

function editBook(id) {
    
    document.getElementById('bookId').type = 'text';
    document.getElementById('submitButton').innerText = 'Edit Book';
        
}
/*   function editBook(button) {

const row = button.closest('tr');

const id = row.cells[0].textContent;

fetch(`http://localhost:8080/books/${id}`)
.then(response => response.json())
.then(book => {
    document.getElementById('bookId').value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
});
}*/


function deleteBook(id) {
    fetch(`http://localhost:8080/books/${id}`, { method: 'DELETE' }).then(fetchBooks);
}