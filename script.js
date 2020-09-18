let container = document.getElementById('library');

let buttonAdd = document.getElementById('addNewBook');
buttonAdd.addEventListener('click', addBookToLibrary)

let clearButton = document.getElementById('empty-library');
clearButton.addEventListener('click', clearLocalStorage);

/* ===== Book Constructor ===== */
function Book(title, author, pages, read = false){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

/* ===== Library Array and saving to Local Storage===== */
let myLibrary = localStorage.getItem('items')
? JSON.parse(localStorage.getItem('items'))
: []

localStorage.setItem('items', JSON.stringify(myLibrary));

/* ===== Getting data from Local Storage  ===== */
const data = JSON.parse(localStorage.getItem('items'))


/* ===== Adding book to libray function ===== */
function addBookToLibrary(){  

    let book_title = document.getElementById('name').value;
    let book_author = document.getElementById('author').value;
    let book_pages = document.getElementById('pages').value

    if(book_title === '' || book_author === '' || book_pages === ''){
        alert('Please fill out the form');
        return;
    }
    else if(isNaN(book_pages)){
        alert('Pages must be a number');
        return;
    }
    else{
        if(myLibrary.some(book => book.title === book_title)){
            alert('This book already exists in your library');
            return;
        }

        const book = new Book(book_title, book_author, book_pages);

        myLibrary.push(book);

        createBook(book);

        localStorage.setItem('items', JSON.stringify(myLibrary));

        clearValues();
    }
};
/* ===== Loop through library ===== */
function render() {
    const bookshelf = document.getElementById('library');
    const books = document.querySelectorAll('.book-cover');
    books.forEach(book => bookshelf.removeChild(book));
   
    for(let index in myLibrary)
        createBook(myLibrary[index]);
    
}

/* ===== Creating new book ===== */
function createBook(book){

    const container = document.getElementById('library');

    const bookCover = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readCheck = document.createElement('div');
    const removeButton = document.createElement('button');


    bookCover.classList.add('book-cover');
    bookCover.setAttribute('id', myLibrary.indexOf(book));

    titleDiv.textContent = book.title;
    titleDiv.classList.add('title');
    bookCover.appendChild(titleDiv);

    authorDiv.textContent = book.author;
    authorDiv.classList.add('author');
    bookCover.appendChild(authorDiv);

    pagesDiv.textContent = book.pages;
    pagesDiv.classList.add('pages');
    bookCover.appendChild(pagesDiv);

    readCheck.innerText = 'No';
    readCheck.classList.add('read-toggle')
    bookCover.appendChild(readCheck);
    
    if(book.read === false){
        readCheck.innerText = 'Not Read';
    }
    else{
        readCheck.innerText = 'Read';
    }

    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    bookCover.appendChild(removeButton);

    /* ===== Event Listeners for read-toggle and Delete button ===== */
    readCheck.addEventListener('click', () => {
       
        book.read = !book.read;
        console.log(book);

        localStorage.setItem('items', JSON.stringify(myLibrary));
        render();

    });
    removeButton.addEventListener('click', () => {

        myLibrary.splice(myLibrary.indexOf(book),1);
        localStorage.setItem('items', JSON.stringify(myLibrary));
        render();
         
    });
    
    container.appendChild(bookCover);
      
};

/* ===== Clear Library and Storage function ===== */
function clearLocalStorage(){
    localStorage.clear();
    myLibrary = [];
    container.innerHTML = '';
    clearValues();
};

/* ===== Empty the user unput function ===== */
function clearValues(){
    document.getElementById('name').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
};

/* ===== Looping through stored data ===== */
data.forEach(() => {
    render();
});

