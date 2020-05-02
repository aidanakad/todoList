const endpoint = 'http://localhost:3000'


// export const fetchGetList = ()=>{
//     return fetch(`${endpoint}/list`)
//     .then(response =>{
//         if (response.ok) return response.json()
//         throw new Error('Не удалось загрузить список задач')
//     })
// }

 const fetchAddTask = (body) => {
    return fetch(`${endpoint}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(response =>{
        if(response.ok) return response.json()
        throw new Error('Не удалось добавить задачу')
    })
  }

const fetchEditTask = (body, id)=>{
    return fetch(`${endpoint}/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then(response =>{
          if(response.ok) return response.json()
          throw new Error('Не удалось внести редактирование')
      })
  }
 const fetchDeleteTask = (id)=>{
    return fetch(`${endpoint}/delete/${id}`, {
        method: 'DELETE',
      })
      .then(response=>{
          if( response.ok) return response.json()
          throw new Error('Не удалось удалить задачу')
      })
  }

  export default{
   fetchGetList: ()=>{
        return fetch(`${endpoint}/list`)
        .then(response =>{
            if (response.ok) return response.json()
            throw new Error('Не удалось загрузить список задач')
        })
    }
  }