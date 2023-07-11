//-------------------------DOCUMENT VARIABLES-------------------------//
const bookGrid = document.querySelector('.book-display-box');
const addBookButton = document.querySelector('#add-button');
const addBookModal = document.querySelector('.add-book-modal');
const closeBookButton = document.querySelector('.close-btn');

//-------------------------EVENT LISTENERS-------------------------//
addBookButton.addEventListener('click', () => {
    togglePopup();
})

closeBookButton.addEventListener('click', () => {
    togglePopup();
})

//-------------------------DATA STRUCTURES-------------------------//
let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    library.push(book);
}

function displayBooks() {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookGrid.appendChild(bookCard);
}

function togglePopup() {
    addBookModal.classList.toggle('active');
}