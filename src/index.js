import {
    fetchGetList,
    fetchAddTask,
    fetchEditTask,
    fetchDeleteTask
} from './api'
import {
    createEl
} from './tools'


const list = document.querySelector('#list')

const renderTask = (task) => {

    const li = createEl('li')
    const text = createEl('div', task.text)
    const btnWrepper = createEl('div')
    const doneBtnTxt = !task.done ? 'Сделано' : 'Не сделано'
    const doneBtn = createEl('button', doneBtnTxt)
    const editBtn = createEl('button', 'Редактировать')
    const deleteBtn = createEl('button', 'Удалить')
    list.appendChild(li)
    li.appendChild(text)
    li.appendChild(btnWrepper)
    btnWrepper.appendChild(doneBtn)
    btnWrepper.appendChild(editBtn)
    btnWrepper.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        fetchDeleteTask(task.id)
            .then(() => {
                li.remove()
                renderTaskList()
            })
    })

    doneBtn.addEventListener('click', () => {
        fetchEditTask(task.id, {
                done: !task.done
            })
            .then(() => {
                li.remove()
                renderTaskList()
            })
    })
    if (task.done) li.classList.add('done')

    editBtn.addEventListener('click', () => {
        const editInput = createEl('input', {
            class: 'edit-input'
        })
        editInput.type = 'text'
        editInput.value = task.text
        li.insertBefore(editInput, text)
        li.removeChild(text)
        editInput.addEventListener('blur', () => {
            fetchEditTask(task.id, {
                    text: editInput.value
                })
                .then(() => {
                    li.remove()
                    renderTaskList()
                })
        })
    })
}

const renderTaskList = () => {
    const list = document.querySelector('#list')
    fetchGetList()
        .then(taskList => taskList.forEach((item) => renderTask(item)))
}
renderTaskList()

const noteArea = document.querySelector('input[name="note"]')
const textarea = document.querySelector('textarea[name="description"]')
const createBtn = document.querySelector('#create')

createBtn.addEventListener('click', () => {
    fetchAddTask({
            text: noteArea.value,
            textarea: noteArea.value
        })
        .then(() => {
            const list = document.querySelector('#list')
            list.remove()
            renderTaskList()
        })
})