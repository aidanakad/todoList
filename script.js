const list = document.querySelector('#list')

const createEl = (tag, text, attrs = {})=>{
    const el = document.createElement(tag)
    el.textContent = text;
    Object.keys(attr).forEach((key)=>{
        el.setAttribute(key, attrs[key])
    })
    return el
}

const endpoint = 'http://localhost:3000'

const fetchGetList = ()=>{
    return fetch(`${endpoint}/list`)
    .then(response => response.json())
}

const fetchAddTask = (body) => {
    return fetch(`${endpoint}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  const fetchEditTask = (body, id)=>{
    return fetch(`${endpoint}/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
  }

  const fetchDeleteTask = (id)=>{
    return fetch(`${endpoint}/delete/${id}`, {
        method: 'PUT',
      })
  }


  const renderTask = (task)=>{
      const li = createEl('li')
      list.appendChild(li)

      const text = createEl('div', task.text)
      li.appendChild(text)

      const btnWrapper = createEl('div', null, {class: 'btn-wrapper'})
      li.appendChild(btnWrapper)

      const doneBtnText = !task.done ? 'сделано' : 'не сделано'

      const doneBtn = createEl('button', doneBtnText)
      const deleteBtn = createEl('button', 'удалить')
      const editBtn = createEl('button', 'редактировать')

      btnWrapper.appendChild(doneBtn)
      btnWrapper.appendChild(deleteBtn)
      btnWrapper.appendChild(editBtn)

      deleteBtn.addEventListener('click', ()=>{
        fetchDeleteTask(task.id)
        .then(() => window.location.reload())
      })

      doneBtn.addEventListener('click', ()=>{
        fetchEditTask(task.id, { done: !task.done })
      })

      if(task.done) li.className ('done')

      editBtn.addEventListener('click', ()=>{
        const input = createEl('input')
        input.type = 'text'
        input.value = task.text
        li.replaceChild(input, task.text)
        input.addEventListener('blur', ()=>{
          fetchEditTask(task.id, {text: input.value})
        })
      })
  }