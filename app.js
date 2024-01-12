const btn = document.querySelector(".new-book-btn");
const form = document.querySelector("form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const error = document.querySelector(".error");
let library = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = this.getNextId();
  }

  getNextId() {
    if (!Book.currentId) {
      Book.currentId = 1;
    }
    return Book.currentId++;
  }
}

window.addEventListener("load", initLibraryWithPlaceholderBook);
form.addEventListener("submit", handleSubmit);

function initLibraryWithPlaceholderBook() {
  const placeholderBook = new Book("The Nightingale", "Kristin Hannah");
  addBookToLibrary(placeholderBook);
}

function handleSubmit(event) {
  event.preventDefault();
  addBookToLibrary(new Book(titleInput.value, authorInput.value));
}

function addBookToLibrary(book) {
  const isDuplicate = library.some(
    (libraryBook) =>
      libraryBook.title === book.title && libraryBook.author === book.author
  );

  if (isDuplicate) {
    // js custom form validation message
    error.textContent = `The book "${book.title}" by "${book.author}" already exists in the library.`;
    return;
  } else {
    error.textContent = "";
  }

  library.push(book);
  displayBook(book);
}

function displayBook(book) {
  const table = document.querySelector("table");

  const row = table.insertRow();
  row.dataset.id = book.id;

  const cell1 = row.insertCell();
  cell1.textContent = book.title;

  const cell2 = row.insertCell();
  cell2.textContent = book.author;

  const cell3 = row.insertCell();
  cell3.innerHTML = `
    <div class="cell-actions"> 
      <select name="status" id="status">
        <option value="not-started">Not Started</option> 
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <i class="fa-solid fa-trash-can"></i>
    </div>
  `;

  const trashIcons = document.querySelectorAll(".fa-trash-can");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", removeBook);
  });
}

function removeBook(event) {
  const parentRow = event.target.closest("tr");
  const parentRowId = parentRow.dataset.id;

  const bookIndex = library.findIndex((book) => book.id == parentRowId);

  library.splice(bookIndex, 1);
  parentRow.remove();
}
