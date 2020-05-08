    import {
        createEl
    } from './tools'

    export const colorPicker = () => {
        const colors = ['#FFFBE3', ' #FFD2D2', ' #D3D2FF', ' #D7FDD1', '#F8E1B6']
        const colorBar = createEl('div', null, {
            class: 'color-boxы'
        })
        const colorBox = document.querySelector('.colors')
        colorBox.appendChild(colorBar)
        const btn1 = createEl('button')
        const btn2 = createEl('button')
        const btn3 = createEl('button')
        const btn4 = createEl('button')
        const btn5 = createEl('button')
        colorBar.appendChild(btn1)
        colorBar.appendChild(btn2)
        colorBar.appendChild(btn3)
        colorBar.appendChild(btn4)
        colorBar.appendChild(btn5)
        colors.forEach(color => {
            colorBar.forEach(btn => {
                btn.style.backgroundColor = color[index]
            })
        })
    }