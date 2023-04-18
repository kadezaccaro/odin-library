const btn = document.querySelector(".new-book-btn");
const form = document.querySelector("form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");

let library = [];

// ------ EVENT LISTENERS ------

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

// ------ FUNCTIONS ------

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = Book.prototype.getNextId();
}

Book.prototype.currentId = 1;
Book.prototype.getNextId = () => {
  return Book.prototype.currentId++;
};

function addBookToLibrary() {
  const book = new Book(titleInput.value, authorInput.value);

  const doesBookExist = library.some(
    (libraryBook) =>
      libraryBook.title === book.title && libraryBook.author === book.author
  );

  if (doesBookExist) return;

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
