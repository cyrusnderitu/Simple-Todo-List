
// Selector
const todoBtn = document.querySelector('.todo-btn') /* - The Class todo-btn 
of the input submit, is being grabbed in order to add an event to it later once the button has been clicked*/

const todoinput = document.querySelector('.todo-input') /*- The Class todo-input 
has been grabbed in order to tell where the information provided in the input field should be used*/

const todoList = document.querySelector('.todo-list')/* - The Class todo-list 
of the ordered list has been grabbed in order to make it a parent Element of the children nodes that are yet to be created*/

const filterOption = document.querySelector(".filter-Todo")

//Event listener
document.addEventListener('DOMContentLoaded', showContent)
todoBtn.addEventListener('click', todoAdd) // Event listener on the Submit Button followed with a function i.e what to do once the button gets clicked
todoList.addEventListener('click', deleteTodo) // Event listener of the parentElement on any action to the children nodes e.g the trash can for deleting a ToDo list.
todoList.addEventListener('click', checkTodo) // Event listener of the parentElement on any action to the children nodes e.g the check mark for completing a ToDo list.
filterOption.addEventListener('click', filterTodo)

/*Functions for creating the field that will accomodate each and every ToDo List item
i.e
     1.Container Div parent that will have a child of a LI(list), the check button, and the trash can button*/
function todoAdd(event){
    event.preventDefault();

    //Creating the Parent Element for the below child nodes
    const todoContainer = document.createElement('div') // Creating the needed child Elements
    todoContainer.classList.add('todo-Cont'); //Giving it a class name for styling in the css

    // Creating the First Child Node
    const todoText = document.createElement('li'); // Creating the needed child Elements
    todoText.classList.add('todo-txt'); //Giving it a class name for styling in the css
    todoText.innerHTML = todoinput.value; // Dynamic Content of the node created
    saveLocalStorage(todoinput.value)
    // Creating the Second Child Node
    const completedButton = document.createElement('button') // Creating the needed child Elements
    completedButton.classList.add('check-btn') //Giving it a class name for styling in the css
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>' // Static Content of the node created

    // Creating the Third Child Node
    const trashButton = document.createElement('button') // Creating the needed child Elements
    trashButton.classList.add('trash-btn') //Giving it a class name for styling in the css
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>' // Static Content of the node created

    // The Structure of the above DOM Manipulation
    /*
        <div class = "todo-Cont">
            <li>[example]</li> // Where the input field value will go
            <button class="check-btn"> <i class="fa-solid fa-check"></i> </button>
            <button class="trash-btn"> <i class="fa-solid fa-trash-can"></i> </button>
        </div>    
    */

        // The Above Design represent every component a single item will have once created from the input field and submitted
    
    //Appending Children and Parent
    todoContainer.appendChild(todoText) //Appending Third Child(trash can) to Parent(Div Container)
    todoContainer.appendChild(completedButton)//Appending Second Child(Check mark) to parent(DivContaier)
    todoContainer.appendChild(trashButton)
    todoList.appendChild(todoContainer)

        // The Structure of the above DOM Manipulation
    /*
    <div class="todo-list"> - This can be seen in the html  
        <div class = "todo-Cont">
            <li>[example]</li> // Where the input field value will go
            <button class="check-btn"> <i class="fa-solid fa-check"></i> </button>
            <button class="trash-btn"> <i class="fa-solid fa-trash-can"></i> </button>
        </div>   
    </div> 
    */

    //Clearing Input Field
    todoinput.value = ''; // Once todoInput value has been submitted, the input field should be cleared of any text
}

// const textNote = document.querySelector('.todo-txt')


// function deleteText(){
//     document.getElementById('demo').innerHTML = "";
// }

// Function on events to occur on the click of the delete trash icon
function deleteTodo(e1){
    const item = e1.target;
    const todo = item.parentElement;
    if(item.classList[0] === 'trash-btn'){
        
        const conside = confirm('Do you agree to delete item from list ?');

        if(conside === true){
        todo.addEventListener('transitionend', function(){
            todo.remove()
        }); 
        // Extras -- e.g. Css Styling 
    // Adding a new class to handle the Transform effect after deletion
        todo.style.transform = "translateY(10rem) rotateZ(30deg)";
        todo.style.opacity = "0.5";
 
        document.getElementById('demo').style.backgroundColor = "red"; 

        //Timer for the show and delete text on the innnerHTML section of id = "demo"
        setTimeout(function showTextCheck(){
            document.getElementById('demo').innerHTML = `Trashed`;
        }, 0)
        setTimeout(function deleteText(){
            document.getElementById('demo').innerHTML = "";
        }, 1000)}
        else{
            setTimeout(function showTextCheck(){
                document.getElementById('demo').innerHTML = `You have decided not to delete`;
            }, 0)
            setTimeout(function deleteText(){
                document.getElementById('demo').innerHTML = "";
            }, 1000)
        }
    }
}

// Function on events to occur on the click of the Completed Check icon
function checkTodo(e2){
    const item = e2.target;
    if(item.classList[0] === 'check-btn'){
        const conside = confirm('Do you agree to check the list ?');

        if(conside === true){
        const todo = item.parentElement;
        todo.classList.add('completed') // Class created for extra css

        document.getElementById('demo').style.backgroundColor = "greenYellow";
        todo.style.borderLeft = " 10px solid green";

        //Timer for the show and delete text on the innnerHTML section of id = "demo"
        setTimeout(function showTextCheck(){
            document.getElementById('demo').innerHTML = `Completed`;
        }, 0)
        setTimeout(function deleteText(){
            document.getElementById('demo').innerHTML = "";
        }, 1000)}
        else{
            setTimeout(function showTextCheck(){
                document.getElementById('demo').innerHTML = `You have canceled your check request`; 
            }, 0)
            setTimeout(function deleteText(){
                document.getElementById('demo').innerHTML = "";
            }, 1000)
        }
    }
}

//Function to filter the todo's from all to completed and uncompleted.
function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos) // The childnodes is refering to the todo-Cont, todo-txt, trash-btn and check-btn
    todos.forEach(function(todo){ // The forEach will check the childnodes(div, li, button, button)
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";// todo represents parentElement that contains all the childnodes
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
        }
    })

}

function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('storageTodos', JSON.stringify(todos))
}