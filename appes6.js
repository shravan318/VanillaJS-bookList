class Book {
constructor(title, author,isbn){
this.title = title
this.author = author
this.isbn = isbn
}
}
class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //select row
        const row = document.createElement("tr")
        //insert td
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="delete">X</a></td>
        `
        list.appendChild(row)

    }
    showAlert(msg,className){
        const div = document.createElement("div")
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg))

        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form)


        //timeout of toaster
        setTimeout(function () {
            document.querySelector(".alert").remove();
        },3000)
    }
    deleteBook(target){
        if (target.className === "delete") {
            target.parentElement.parentElement.remove()
        }
    }
    
    clearFields(){
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("isbn").value = ""
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
         books = []
        }else{
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
           const ui = new UI


           //add book to ui 
           ui.addBookToList(book)
        })
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })
        
        localStorage.setItem("books", JSON.stringify(books))
        
        
    }

}

document.getElementById("book-form").addEventListener("submit",function (e) {

    //get values 
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const isbn = document.getElementById("isbn").value

    // instantiate book
    const book = new Book(title,author,isbn)

    console.log(book)

    //instantiate ui
    const ui = new UI()
    console.log(ui)



    //validation
    if (title === "" || author === "" || isbn === "") {
        // errorAlert
        ui.showAlert("Please fill in all fields","error")

    } else {
        //add book to ui
        ui.addBookToList(book)

        // add book to local storage

        Store.addBook(book)

        ui.showAlert("Book Added","success")
        ui.clearFields()
    }


    e.preventDefault()
})
//DOM EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks)
//eventlistner for delete

document.getElementById("book-list").addEventListener("click",function (e) {

    const ui = new UI()
    ui.deleteBook(e.target)


    // remove book from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //show alert
    ui.showAlert("Book Removed","success")
    e.preventDefault()
})
