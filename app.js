// book constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// ui constructor
function UI (){
    UI.prototype.addBookToList = function (book){
        //choose the list 
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

    UI.prototype.clearFields = function (){
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("isbn").value = ""
    }

    UI.prototype.showAlert = function (msg, className){
        const div = document.createElement("div")
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg))

        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div, form)


        //timeout of toaster
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000)
    }

    UI.prototype.deleteBook = function (target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove()
        }
    }

}

//Event listener add book

document.getElementById("book-form").addEventListener("submit", function(e){

    //get values 
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const isbn = document.getElementById("isbn").value

    // instantiate book
    const book = new Book(title, author,isbn)

    console.log(book)

    //instantiate ui
    const ui = new UI()
    console.log(ui)
    
    
    
    //validation
    if(title === "" || author === "" || isbn ===""){
        // errorAlert
        ui.showAlert("Please fill in all fields", "error")
        
    }else{        
        ui.addBookToList(book)
        
        ui.showAlert("Book Added", "success")
        ui.clearFields()
    }
    
    
    e.preventDefault()
})

//eventlistner for delete

document.getElementById("book-list").addEventListener("click", function(e){
    
    const ui = new UI()
    ui.deleteBook(e.target)

    //show alert
    ui.showAlert("Book Removed", "success")
    e.preventDefault()
})

