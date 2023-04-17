const btn = document.querySelector(".new-book-btn");
const form = document.querySelector("form");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");

let myLibrary = [];

// ------ EVENT LISTENERS ------

// window.addEventListener("load", displayBook);

btn.addEventListener("click", () => {
  form.classList.toggle("hide-form");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

// ------ FUNCTIONS ------

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary() {
  const book = new Book(titleInput.value, authorInput.value);
  myLibrary.push(book);
  displayBook(book);
}

function displayBook(book) {
  const table = document.querySelector("table");

  const row = table.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  const cell3 = row.insertCell();

  cell1.textContent = book.title;
  cell2.textContent = book.author;
  cell3.innerHTML = `<div class="cell-actions">
  <select name="status" id="status">
    <option value="not-started">Not Started</option>
    <option value="in-progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
  <i class="fa-solid fa-trash-can"></i>
</div>`;
}
