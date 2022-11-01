export default function html([fist, ...strings], ...values) {
    return values.reduce(
        (acc, curr) => acc.concat(curr, strings.shift()), 
        [fist])
        .filter(x => x && x !== true || x === 0)
        .join("")
}

export function createStore(reducer) {
    let state = reducer()

    const roots = new Map()

    // render giao diện
    function render() {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        // đẩy ra root
        attach(component, root) {
            roots.set(root, component)
            render()
        },


        // selector giúp lựa chọn 1 kiểu dữ liệu cụ thể trong store
        connect(selector = state => state) {
            return component => (props, ...args) => 
                component(Object.assign({}, props, selector(state), ...args))
        },

        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }
}



