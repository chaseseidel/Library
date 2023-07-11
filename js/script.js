//-------------------------DOCUMENT VARIABLES-------------------------//
const bookGrid = document.querySelector('.book-display-box');
const addBookButton = document.querySelector('#add-btn');
const addBookModal = document.querySelector('.add-book-modal');
const closeBookButton = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const submitButton = document.getElementById('submit-btn');

//-------------------------EVENT LISTENERS-------------------------//
addBookButton.addEventListener('click', () => {
    togglePopup();
})

closeBookButton.addEventListener('click', () => {
    togglePopup();
})

overlay.addEventListener('click', () => {
    togglePopup();
})

submitButton.addEventListener('click', () => {
    addBookToLibrary(createBook());
    resetBookGrid();
    createBookGrid();
    resetForm();
    togglePopup();
    libraryIndex += 1;
})

//-------------------------DATA VARIABLES-------------------------//
let libraryIndex = 0;
let library = [];

//-------------------------DATA STRUCTURES-------------------------//
class Book {
    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }
}

//-------------------------LIBRARY FUNCTIONS-------------------------//

function addBookToLibrary(book) {
    library.push(book);
}

function markAsRead(index) {
    library[index].read === true ? library[index].read = false : library[index].read = true;
}

function deleteBook(index) {
    delete library[index];
}

//-------------------------BOOK GRID FUNCTIONS-------------------------//

function createBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read-status').checked;
    const index = libraryIndex;
    return new Book(title, author, pages, read, index);
}

function createBookGrid() {
    library.forEach(book => createBookCard(book));
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('button');
    const remove = document.createElement('button');
    
    read.classList.add('read-btn');
    title.textContent = `"${book.title}"`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} pages`;
    if (book.read === false) {
        read.textContent = 'Not Read';
    } else {
        read.textContent = 'Read';
        read.classList.toggle('read');
    }
    read.addEventListener('click', () => {
        markAsRead(book.index);
        if (read.textContent === 'Not Read') {
            read.textContent = 'Read';
            read.classList.toggle('read');
        } else {
            read.textContent = 'Not Read';
            read.classList.toggle('read');
        }
    })
    remove.textContent = 'Remove';
    remove.classList.add('remove-btn');
    remove.addEventListener('click', () => {
        deleteBook(book.index);
        bookGrid.removeChild(bookCard);
    })

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);
    bookGrid.appendChild(bookCard);
    bookCard.classList.add('book-card');
}

function resetBookGrid() {
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }
}

//-------------------------FORM POPUP FUNCTIONS-------------------------//

function togglePopup() {
    addBookModal.classList.toggle('active');
}

function resetForm() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read-status');
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}