import storage from "./util/storage.js"


// dữ liệu khởi tạo
const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    }
}

const actions = {
    // thêm ghi chú
    add({ todos }, title) {

        if(title) {
            todos.unshift({ title, completed: false})
            storage.set(todos)
        }
    },

    //  click sẽ hiện dấu gạch
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },

    // check tất cả 
    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed)
        storage.set(todos)
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}