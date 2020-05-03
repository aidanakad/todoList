import {fetchGetList, fetchAddTask, fetchEditTask, fetchDeleteTask} from './api'
import {createEl} from './tools'



 const renderTask = (task, list) =>{
    const list = document.querySelector('#list')
    const li = createEl('li')
    const text = createEl('div', task.text)
    const btnWrepper = createEl('div')
    const doneBtnTxt = !task.done ? 'Сделано' : 'Не сделано'
    const doneBtn = createEl('button', doneBtnTxt)
    const editBtn = createEl('button', 'Редактировать')
    const deleteBtn = createEl('button', 'Удалить')
    list.appendChild(li)
    li.appendChild(div)
    li.appendChild(btnWrepper)
    btnWrepper.appendChild(editBtn)
    btnWrepper.appendChild(doneBtn)
    btnWrepper.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', ()=>{
        fetchDeleteTask(task.id)
        .then(()=>{
            renderTaskList()
        })
    })

    doneBtn.addEventListener('click',() => {
        fetchEditTask(task.id, {text: !task.done})
    })
    if(task.done) li.className = 'done'

    editBtn.addEventListener('click', () =>{
        const editInput = createEl('input')
        editInput.type = 'text'
        editInput.value = task.text
        li.insertBefore(editInput, task.text)
        li.removeChild(text)
        input.addEventListener('blur', ()=>{
            fetchEditTask(task.id, {text: editInput.value})
            .then(()=>{
                renderTaskList()
            })
        })
    })
}

const renderTaskList = ()=>{
    const list = document.querySelector('#list')
    fetchGetList()
    .then(taskList => taskList.forEach((item) => renderTask(item, list)))
}
 renderTaskList()

const noteArea = document.querySelector('input[name="note"]')
const textarea = document.querySelector('textarea[name="description"]')
const createBtn = document.querySelector('#create')

createBtn.addEventListener('click', ()=>{
  fetchAddTask ({text: noteArea.value, textarea: noteArea.value})
  .then(()=>{
      const list = document.querySelector('#list')
      list.remove()
      renderTaskList()
  })
})
