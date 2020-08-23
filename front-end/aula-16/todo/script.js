
const form = document.querySelector('form')
const input = document.querySelector('form input')
const button = document.querySelector('form button')
const toDo = document.querySelector('.todo')
const done = document.querySelector('.done')


form.addEventListener("submit", event => {
    event.preventDefault()

    const task = document.createElement("li")
    
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")

    checkbox.addEventListener("input", doneTask)

    const text = document.createElement("span")
    text.innerHTML = input.value

    const buttonDelete = document.createElement("button")
    buttonDelete.innerHTML = "Deletar"

    buttonDelete.addEventListener("click", deleteTask)

    task.append(checkbox)
    task.append(text)
    task.append(buttonDelete)

    toDo.append(task)
    
    input.value = ""
    input.replace(2, 2)
})

function deleteTask(event) {
    const deleteButton = event.target
    const liTask = deleteButton.closest("li")

    liTask.remove()
}

function doneTask(event) {
    const checkbox = event.target
    const liTask = checkbox.closest("li")

    if(checkbox.checked) {
        done.append(liTask)
    } else {
        todo.append(liTask)
    }

}