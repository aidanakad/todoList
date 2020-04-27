const list = document.querySelector('#list')



const fetchAdd = (body) =>{
    fetch('http://localhost:3000/add',{
    method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(body),
    })
}

const fetchEdit =(id, body)=>{
    fetch(`http://localhost:3000/edit/${id}`,{
    method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify(body),
    })
}

const fetchDelete =(id)=>{
    fetch(`http://localhost:3000/delete/${id}`,{
    method: 'DELETE',
    })
}


const renderTask = (task) =>{
    const li = document.createElement('li');


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить'

    deleteBtn.addEventListener('click', () => {
        fetchDelete(task.id)
        window.location.reload()
    })


    const isDoneBnt = document.createElement('button')
    if(task.done === true){
        isDoneBnt.textContent='Сделано'
    }else{
        isDoneBnt.textContent= 'не сделано'
    }

    isDoneBnt.addEventListener('click', ()=>{
        fetchEdit(task.id, )
    })



    li.textContent = task.text 
    li.setAttribute('data-number', task.id);

    if( task.done === true) li.classList.add('done');
    li.appendChild(deleteBtn)
    li.appendChild(isDoneBnt)
    list.appendChild(li)
}

fetch('http://localhost:3000/list')
.then(response => {
    return response.json()
})
.then(taskList =>{
    taskList.forEach(renderTask)
})


