const addButton: HTMLButtonElement|null = document.querySelector("#todoAddButton");
const inputTextField: HTMLButtonElement|null = document.querySelector("#todoInputField");
const todosContainer: HTMLDivElement = document.querySelector("#todoContainer")!;

type Todo = {
    id: number,
    title: string,
    description?: string,
    isDone?: boolean,

}

let arrayOfTodos: Todo[] = [];

if (addButton && inputTextField && todosContainer) {
    
    addButton?.addEventListener('click',(e) =>{
        let textValue: string = inputTextField.value;

        arrayOfTodos.push({id: arrayOfTodos.length, title:textValue});
        inputTextField.value='';
        buildList();
    })
}

function buildList() {
    todosContainer.innerHTML = "";
    arrayOfTodos.forEach(element => {
        let container = document.createElement("div");
        container.classList.add("card-body","card","shadow");

        let id = document.createElement('p');
        id.classList.add("small");
        let title = document.createElement('h3');
        title.classList.add("h3");
        let button = document.createElement('button');
        button.classList.add("button","bg-danger","rounded","text-white");
        let editButton = document.createElement('button');
        editButton.classList.add("button", "bg-info", "rounded","text-white");

        id.textContent= "id: " + element.id;
        title.textContent = "tytul: " + element.title;
        button.innerText= "delete";
        editButton.innerText="edytuj";

        button.addEventListener('click', (e) => {
            container.remove();
            arrayOfTodos = arrayOfTodos.filter((item) => item.id !== element.id);
        });

        editButton.addEventListener('click', (e) => {
            let innaNazwa = document.createElement("input");
            innaNazwa.value=element.title;
            container.appendChild(innaNazwa);
            innaNazwa.addEventListener('change', (e) =>{
                element.title=innaNazwa.value.trim();
                buildList();
            })
        })

        container.appendChild(id);
        container.appendChild(title);
        container.appendChild(button);
        container.appendChild(editButton)

        todosContainer?.appendChild(container);
    })
}