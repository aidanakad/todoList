import {fetchGetList, fetchAddTask, fetchEditTask, fetchDeleteTask} from './api'
import {createEl} from './tools'



 const renderTask = (task) =>{
    const list = document.querySelector('#list')
    const li = createEl('li')
    const div = createEl('div')
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
    if(task.done) li.className = '.done'

    editBtn.addEventListener('click', () =>{
        const editInput = createEl('input')
        editInput.type = 'text'
        editInput.value = task.text
        li.insertBefore(editInput, task.text)
        li.removeChild(text)
        input.addEventListener('blur', ()=>{
            fetchEditTask(task.id, {text: input.value})
            .then(()=>{
                // const list = document.querySelector('#list')
                // list.remove()
                renderTaskList()
            })
        })
    })
}

const renderTaskList = ()=>{
    fetchGetList()
    .then(taskList => taskList.forEach((item) => renderTask(item, list)))
}
 renderTaskList()

const noteArea = document.querySelector('input[name="note-txt"]')
const textarea = document.querySelector('textarea[name="description-txt"]')
const createBtn = document.querySelector('#create')

createBtn.addEventListener('click', ()=>{
  fetchAddTask ({text: input.value, textarea: input.value})
  .then(()=>{
      const list = document.querySelector('#list')
      list.remove()
      renderTaskList()
  })
})
