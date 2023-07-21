//-------------------------DOCUMENT VARIABLES-------------------------//
const bookGrid = document.querySelector(".book-display-box");
const addBookButton = document.querySelector("#add-btn");
const addBookModal = document.querySelector(".add-book-modal");
const closeBookButton = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
const submitButton = document.getElementById("submit-btn");

//-------------------------EVENT LISTENERS-------------------------//
addBookButton.addEventListener("click", () => {
  togglePopup();
});

closeBookButton.addEventListener("click", () => {
  togglePopup();
});

overlay.addEventListener("click", () => {
  togglePopup();
});

// submitButton.addEventListener('click', () => {
//     library.addBookToLibrary(createBook());
//     resetBookGrid();
//     createBookGrid();
//     resetForm();
//     togglePopup();
//     library.index += 1;
// })

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

class Library {
  constructor() {
    this.books = [];
    this.index = 0;
  }

  addBookToLibrary(book) {
    this.books.push(book);
  }

  markAsRead(index) {
    this.books[index].read === true
      ? (this.books[index].read = false)
      : (this.books[index].read = true);
  }

  deleteBook(index) {
    delete this.books[index];
  }

  set Index(index) {
    this.index = index;
  }

  get Index() {
    return this.index;
  }
}

//-------------------------DATA VARIABLES-------------------------//

const library = new Library();

//-------------------------BOOK GRID FUNCTIONS-------------------------//

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read-status").checked;
  const index = library.index;
  return new Book(title, author, pages, read, index);
}

function createBookGrid() {
  library.books.forEach((book) => createBookCard(book));
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("button");
  const remove = document.createElement("button");

  read.classList.add("read-btn");
  title.textContent = `"${book.title}"`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  if (book.read === false) {
    read.textContent = "Not Read";
  } else {
    read.textContent = "Read";
    read.classList.toggle("read");
  }
  read.addEventListener("click", () => {
    library.markAsRead(book.index);
    if (read.textContent === "Not Read") {
      read.textContent = "Read";
      read.classList.toggle("read");
    } else {
      read.textContent = "Not Read";
      read.classList.toggle("read");
    }
  });
  remove.textContent = "Remove";
  remove.classList.add("remove-btn");
  remove.addEventListener("click", () => {
    library.deleteBook(book.index);
    bookGrid.removeChild(bookCard);
  });

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(remove);
  bookGrid.appendChild(bookCard);
  bookCard.classList.add("book-card");
}

function resetBookGrid() {
  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }
}

//-------------------------FORM POPUP FUNCTIONS-------------------------//

function togglePopup() {
  addBookModal.classList.toggle("active");
}

function resetForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read-status");
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

//-------------------------FORM VALIDATION-------------------------//
submitButton.addEventListener("click", () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  if (
    title.validity.valueMissing === false &&
    author.validity.valueMissing === false &&
    pages.validity.valueMissing === false &&
    pages.validity.rangeUnderflow === false
  ) {
    library.addBookToLibrary(createBook());
    resetBookGrid();
    createBookGrid();
    resetForm();
    togglePopup();
    library.index += 1;
  } else {
    if (title.validity.valueMissing) {
      title.setCustomValidity("Please enter the title of the book");
    }
    if (author.validity.valueMissing) {
      author.setCustomValidity("Please enter the name of the author");
    }
    if (pages.validity.rangeUnderflow) {
      pages.setCustomValidity("The page length must be greater than 0");
    } else {
      pages.setCustomValidity("Please enter the number of pages");
    }
  }
});
