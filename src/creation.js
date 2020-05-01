const list = document.querySelector('#list')

export const createEl = (tag, text, attrs = {}) => {
    const el = document.createElement(tag)
    el.textContent = text
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key])
    })
    return el
  }

export const CreateRenderTask = (task) =>{
    

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
}
