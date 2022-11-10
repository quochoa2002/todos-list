import storage from "./util/storage.js"


// dữ liệu khởi tạo
const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    }, 
    editIndex: null,
}

const actions = {
    // thêm ghi chú
    add({ todos }, title) {

        if(title) {
            todos.unshift({ title, completed: false})
            storage.set(todos)
        }
    },

    //  check sẽ hiện dấu gạch
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },

    // check tất cả 
    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed)
        storage.set(todos)
    },

    // chức năng xóa 
    destroy({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },

    switchFilter(state, filter) {
        state.filter = filter
    },

    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },

    // click hiện ô input
    startEdit(state, index) {
        // bật chế dộ edit
        state.editIndex = index
    },

    endEdit(state, title) {
        // kết thúc chế độ edit
        if(state.editIndex !== null) {
            if(title) {
                state.todos[state.editIndex].title = title
                storage.set(state.todos)  
            } else {
                this.destroy(state, state.ed4)
            }
            state.editIndex= null
        }
    },

    cancelEdit(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}