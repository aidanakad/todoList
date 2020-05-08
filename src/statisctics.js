import {
    fetchGetStatistic
} from './api'
import {
    createEl
} from './tools'
import {
    renderTask
} from './index'

export const renderStatistics = (data, list) => {
    const total = createEl('div', 'Всего заметок')
    const doneTask = createEl('div', data.done)
    const undoneTask = createEl('div', data.undone)
    list.appendChild(total)
    list.appendChild(doneTask)
    list.appendChild(undoneTask)
    fetchGetStatistic()
        .then(statData => statData.forEach((data) => renderTask(data, list)))
}