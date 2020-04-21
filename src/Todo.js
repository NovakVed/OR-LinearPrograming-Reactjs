import React, { Component } from 'react';
import TodoItem from "./components/TodoItem";
import todosData from "./todosData";


class Todo extends Component {
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
    }
    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} />)

        return (
            <div className="todo-list">
                {todoItems}
            </div>
        )
    }
}

export default Todo;
