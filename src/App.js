import React, { useState, useEffect } from "react";
import { Container, Form, TextInput, SubmitInput, UnorderdList, ListItem, TodoText, TodoDelete, randomImageUrls } from "./styledComponents";

import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState(0);

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * randomImageUrls.length);
    console.log(randomImageUrls[randomIndex]);
    return randomImageUrls[randomIndex];
  };

  /* 
     할일이 단순히 문자열이면 안 되는 이유!
      - 삭제나 수정을 할 때 구분할 방법이 없다.
      => 따라서 하나의 할일은 하나의 객체로 관리하는 것이 좋다.

    */

  const handleSubmit = (todoText) => {
    setTodo([
      ...todo,
      {
        todoText: todoText,
        todoId: todoId,
        todoDone: false,
        backgroundImage: getRandomImageUrl(),
      },
    ]);

    setTodoId(todoId + 1);
    console.log(todo.backgroundImage);
  };

  const handleToggle = (todoId) => {
    setTodo(
      todo.map((item, index) => {
        return item.todoId === todoId ? { ...item, todoDone: !item.todoDone } : item;
      })
    );
  };

  const handleDelete = (todoId) => {
    setTodo(todo.filter((item) => item.todoId !== todoId));
  };

  useEffect(() => {
    const defaultTodo = JSON.parse(localStorage.getItem("todo"));

    if (!defaultTodo) return;

    setTodo(defaultTodo);
    if (defaultTodo.length !== 0) {
      setTodoId(defaultTodo[defaultTodo.length - 1].todoId + 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.target.todo.value);
          e.target.todo.value = "";
        }}>
        <TextInput type="text" placeholder="할일 쓰기" name="todo" />
        <SubmitInput type="submit" value="추가" />
      </Form>

      <UnorderdList>
        {todo.map((item, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => {
                handleToggle(item.todoId);
              }}
              backgroundimage={item.backgroundImage}
              tododone={item.todoDone ? "block" : "none"}>
              <TodoText className="todoText">{item.todoText}</TodoText>
              <TodoDelete
                onClick={(e) => {
                  e.stopPropagation(); //stop event propagation
                  handleDelete(item.todoId);
                }}></TodoDelete>
            </ListItem>
          );
        })}
      </UnorderdList>
    </Container>
  );
}

export default App;
