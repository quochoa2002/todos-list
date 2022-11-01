import html from '../core.js'
import { connect } from '../store.js'
import Header from './Header.js'



function TodoItem({ todo, index }) {
    return html `
            <li class="${todo.completed && 'completed'}">
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.completed && 'checked'} onchange="dispatch('toggle', ${index})">
                    <label>${todo.title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${todo.title}")">
            </li>   
    `
}


export default TodoItem