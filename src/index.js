import {
    fetchGetList,
    fetchAddTask,
    fetchEditTask,
    fetchDeleteTask
} from './api'
import {
    createEl
} from './tools'
// import {
//     renderStatistics
// } from './statisctics'

const renderTask = (task, list) => {

    const li = createEl('li')
    const text = createEl('div', task.text, {class: 'title'})
    const descr = createEl ('div', task.textarea)
    const btnWrepper = createEl('div')
    const doneBtnTxt = !task.done ? 'Сделано' : 'Не сделано'
    const doneBtn = createEl('button', doneBtnTxt)
    const editBtn = createEl('button', 'Редактировать')
    const deleteBtn = createEl('button', 'Удалить')
    list.appendChild(li)
    li.appendChild(text)
    li.appendChild(descr)
    li.appendChild(btnWrepper)
    btnWrepper.appendChild(doneBtn)
    btnWrepper.appendChild(editBtn)
    btnWrepper.appendChild(deleteBtn)


    deleteBtn.addEventListener('click', () => {
        fetchDeleteTask(task.id)    
            .then(() => {
                list.remove()
                renderTaskList()
            })
            .catch((err)=>{
                const isErr = document.querySelector('.error')
                if(!isErr){
                const errDiv = createEl('div', null, {class: 'error' })
                list.appendChild(errDiv) 
                errDiv.textContent = err.message
            }
            })
    })

    doneBtn.addEventListener('click', () => {
        fetchEditTask(task.id, {
                done: !task.done
            })
            .then(() => {
                list.remove()
                renderTaskList()
            })
            .catch((err)=>{
                const isErr = document.querySelector('.error')
                if(!isErr){
                const errDiv = createEl('div', null, {class: 'error' })
                list.appendChild(errDiv) 
                errDiv.textContent = err.message
            }
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
                    list.remove()
                    renderTaskList()
                })
                .catch((err)=>{
                    const isErr = document.querySelector('.error')
                if(!isErr){
                const errDiv = createEl('div', null, {class: 'error' })
                list.appendChild(errDiv) 
                errDiv.textContent = err.message
            }
                })
        })
    })
}

const renderTaskList = () => {
    const list = createEl('ul', null, {
        id: 'list'
    })
    const box = document.querySelector('.box')
    box.appendChild(list)
    fetchGetList()
        .then(taskList => taskList.forEach((item) => renderTask(item, list)))
        .catch((err) => {
            const errDiv = createEl('div', err.message, {class: 'error' })
            list.appendChild(errDiv)
        } )
}


renderTaskList()
// renderStatistics()

const noteArea = document.querySelector('input[name="note"]')
const textarea = document.querySelector('textarea[name="description"]')
const createBtn = document.querySelector('#create')

createBtn.addEventListener('click', (event) => {
    event.preventDefault()
    fetchAddTask({
            text: noteArea.value,
            textarea:  textarea.value
        })
        .then(() => {
            const list = document.querySelector('#list')
            list.remove()
            renderTaskList()
        })
        .catch((err)=>{
            const isErr = document.querySelector('.error')
            if(!isErr){
                const errDiv = createEl('div', null, {class: 'error' })
                list.appendChild(errDiv) 
                errDiv.textContent = err.message
            }
        })
})