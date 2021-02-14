const endpoint = 'http://localhost:3030'


export const fetchGetList = () => {
    return fetch(`${endpoint}/list`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Не удалось загрузить список задач')
        })
}

export const fetchGetStatistic = ()=>{
    return fetch(`${endpoint}/statistics`)
        .then (response =>{
            if(response.ok) return response.json()
            throw new Error ('Не удалось загрузить статистику')
        })
}

export const fetchAddTask = (body) => {
    return fetch(`${endpoint}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Не удалось добавить задачу')
        })
}

export const fetchEditTask = (id, body) => {
    return fetch(`${endpoint}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Не удалось внести редактирование')
        })
}

export const fetchDeleteTask = (id) => {
    return fetch(`${endpoint}/delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Не удалось удалить задачу')
        })
}