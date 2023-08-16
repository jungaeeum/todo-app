# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment








 > **과제 : 리액트 할일 목록 만들기 프로젝트 (todo list)**
 - state, CRUD 활용
 - localstorage 활용
 - custom 스타일링
 - netlify에 재배포하기

투두리스트 기능  = <span style="text-decoration: underline; font-weight: bold; color: purple">할일 생성(추가)하기, 완료한 할일은 완료표시 하기(다시 누르면 취소) , 삭제하기 </span>


## (1) 할일 생성(추가)하기 [Create]
```사용자가 폼을 작성하고 "추가" 버튼을 누르면 새로운 할일이 생성됩니다.```


먼저 개발할 프로젝트에 npx create-react-app [todo-app(앱이름)] 으로 생성한후
index.js에서는 <React.StrictMode>를 state 렌더링 중복 방지하기 위해 제거한다. 이 컴포넌트를 쓰는 이유는 리액트 자체에서 개발 환경에서 잠재적인 문제를 감지하고 해결할 수 있도록 도와주는 도구라고 간단히 알고 있으면 된다.


메인 App.js
일단 App.css 링크를 연결(import)한 후 
할일 객체를 관리하기위해 useState를 이용한다.


```App.js```
```
import React, { useState } from "react";

import { Container, Form, TextInput, SubmitInput,  
randomImageUrls, Container, Form, TextInput, 
SubmitInput, UnorderdList, ListItem, TodoText, 
TodoDelete, randomImageUrls } from "./styledComponents";

function App() {

const [todo, setTodo] = useState([]); //todo 배열
  const [todoId, setTodoId] = useState(0); //각 todo의 ID


// 각 todo의 배경이미지 소스 랜덤하게 추출
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


//새로운 할일 객체를 생성하고 현재 할일 목록에 추가
  const handleSubmit = (todoText) => {
    setTodo([
      ...todo,
      {
        todoText: todoText, //텍스트
        todoId: todoId,      //아이디
        todoDone: false,     // 완료여부
        backgroundImage: getRandomImageUrl(),   //배경이미지 소스
      },
    ]);

    setTodoId(todoId + 1);
    console.log(todo.backgroundImage);
  };
  
  
  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.target.todo.value);
          e.target.todo.value = ""; //추가버튼을 누르면 input clear
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
                handleToggle(item.todoId); // todo 완료 여부 토글
              }}
              backgroundImage={item.backgroundImage} // styled-components에 참조할 
             											 스타일 속성
              todoDone={item.todoDone ? "block" : "none"}> // styled-components에 참조할
              									완료 이미지 추가여부 (활성화/비활성화)
              <TodoText className="todoText">{item.todoText}</TodoText>
              
              //todo삭제
              
              <TodoDelete  
                onClick={(e) => {
                  e.stopPropagation(); //stop event propagation
                  handleDelete(item.todoId);  // delte 함수
                }}></TodoDelete>
            </ListItem>
          );
        })}
      </UnorderdList>
    </Container>
      
      );
  }
```

```//App.css```
```
*{
    box-sizing: border-box;
  }
  
  html, body, #root{
    height: 100%;
  }
  
  html{
    background-color: #BACAEB;
  }
  
  
  ★(custom) 폰트 설정
  
  @font-face {
    font-family: 'Cafe24Supermagic-Bold-v1.0';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

★(custom) todo폰트에 적용

.todoText {
    font-family: 'Cafe24Supermagic-Bold-v1.0';
    font-weight: 700;
}

```


또한 효율적인 스타일링과 깔끔하게 코드작성을 위해 styled-components 라이브러리를 사용하여 `npm install styled-components` 커스텀 컴포넌트로 구성하였다.

```//styledComponents.js```

```
import styled from "styled-components";


//이미지 src
export const randomImageUrls = ["/img/post-it1.png", "/img/post-it2.png", 
"/img/post-it3.png", "/img/post-it4.png", "/img/post-it5.png"];

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 33%;
  min-width: 375px;
  display: flex;
`;

export const TextInput = styled.input`
  width: 85%;
  height: 3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  margin-right: 15px;

  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

export const SubmitInput = styled.input`
  width: 25%;
  height: 3rem;
  border: none;
  border-radius: 0.2rem;

  color: #ffffff;
  background-color: #5a75aa;
  font-size: 1.2rem;
`;

export const UnorderdList = styled.ul`
  display: flex;
  flex-wrap: wrap; /* ★줄바꿈 설정 */
  width: 73%;
  min-width: 375px;
  padding: 0;

  list-style-type: none;
  
  
  ★(custom) 한줄당 3개의 리스트를 보여주고 그 이상은 다음 줄에 배치

  > * {
    width: 30%;
  }
`;

export const ListItem = styled.li`
  height: 250px;
  padding: 1.575rem;
  margin: 0.5rem;
  
  ★(custom) 추가할때마다 할일 객체의 배경이미지가 랜덤으로 설정하여 반영 
     props참조 접근방식으로 backgroundImage 불러온 값으로 설정
     
  background: ${(props) => (props.backgroundImage ? `url(${props.backgroundImage}) center/contain no-repeat` : "none")};
  background-size: 80% 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TodoText = styled.span`
  display: inline-block;
  width: 90%;
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  line-height: 30px;
`;
```
<br /><br />

## (2) 할일 완료 상태 토글하기 [Update]
```사용자가 할일 항목을 클릭하면 해당 할일의 완료 상태가 토글됩니다.```


```App.js```
```
const handleToggle = (todoId) => {
    setTodo(
      todo.map((item, index) => {
        return item.todoId === todoId ? { ...item, todoDone: !item.todoDone } : item;
      })
    );
  };
  
  return (
    <ListItem
              key={index}
              onClick={() => {
                handleToggle(item.todoId);
              }}
              backgroundImage={item.backgroundImage}
              
              // ★(custom) ListItem을 누를 시 todoDone의 상태값에 따라 block or none 
              스타일 속성이 스타일링 컴포넌트에 에 전달  
              todoDone={item.todoDone ? "block" : "none"}>
              <TodoText className="todoText">{item.todoText}</TodoText>
              
    </ListItem>
  )
```

1. 사용자가 할일 항목을 클릭합니다.
2. handleToggle 함수가 호출됩니다.
3. 해당 할일 항목의 todoDone 속성을 토글하여 완료 상태를 변경합니다.
4 .setTodo 함수를 사용하여 업데이트된 할일 목록을 반영합니다.


```styledComponents.js```

```
export const ListItem = styled.li`
  height: 250px;
  padding: 1.575rem;
  margin: 0.5rem;
  background: ${(props) => (props.backgroundImage ? `url(${props.backgroundImage}) center/contain no-repeat` : "none")};
  background-size: 80% 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

★(custom) todoDone props에 따라 block(보여주기)|| none(안보여주기) display설정
 이미지 아이콘으로 decoration

  &:before {
    content: "";
    display: ${(props) => props.todoDone};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: url("/img/success.png") no-repeat center/cover;
  }
`;


```

<br /> <br />

## (3) 할일 삭제하기 [Delete]
```사용자가 할일 항목의 삭제 버튼을 클릭하면 해당 할일이 삭제됩니다.```

```App.js```
```
const handleDelete = (todoId) => {
    setTodo(todo.filter((item) => item.todoId !== todoId));
  };
  
  
  
  
  .
  .
  .
  .
  return( 
  .
  .
  .
  <UnorderdList>
        {todo.map((item, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => {
                handleToggle(item.todoId);
              }}
              backgroundImage={item.backgroundImage}
              todoDone={item.todoDone ? "block" : "none"}>
              <TodoText className="todoText">{item.todoText}</TodoText>
              
              //todo 삭제
              <TodoDelete
                onClick={(e) => {
                  e.stopPropagation(); //stop event propagation
                  handleDelete(item.todoId);
                }}></TodoDelete>
            </ListItem>
          );
        })}
      </UnorderdList>
      )
```

1. 사용자가 할일 항목의 삭제 버튼을 클릭합니다.
2. handleDelete 함수가 호출됩니다.
3. 클릭된 할일 항목을 제외한 나머지 할일 목록을 필터링하여 새로운 할일 목록을 생성합니다.
4. setTodo 함수를 사용하여 업데이트된 할일 목록을 반영합니다.



```styledComponents.js```

```
export const TodoDelete = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 0.5rem;
  right: 0;
  top: -1%;
  
  ★(custom) 쓰레기통 아이콘으로 디자인변경
  background: url("/img/trash-can.png") no-repeat center/cover;
  z-index: 100;

  position: absolute;
`;
```

<br /> <br />


<h2 style="color: navy">(4) 데이터를 영구적으로 저장하기 위한 localstorage</h2> 


-로컬 스토리지는 클라이언트 측 웹 브라우저에서 데이터를 키-값 쌍으로 저장하는 **웹 스토리지 메커니즘**입니다.
- 저장된 데이터는 브라우저를 닫아도 지속적으로 유지됩니다.
- 로컬 스토리지는 도메인과 브라우저 별로 별도로 저장되며, 다른 도메인의 페이지에서는 접근할 수 없습니다.


 <활용>
 
   - ```localStorage.getItem(key)```: 지정한 키(key)에 해당하는 값을 가져옵니다.
 - ```localStorage.setItem(key, value)```: 지정한 키(key)에 값을 저장합니다.
 - ```localStorage.removeItem(key)```: 지정한 키(key)의 값을 제거합니다.
 - ```JSON.stringify()와 JSON.parse()```: 로컬 스토리지에는 문자열만 저장할 수 있으므로, 객체를 문자열로 변환하여 저장하고 다시 객체로 변환하여 사용한다.
 
 <br/>
 
 
 ```App.js```
 
 
 
```
 import React, { useState, useEffect } from "react";
 
 
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
```




첫번째 useEffect는  컴포넌트가 마운트될 때 한 번 실행된다. 
로컬 스토리지에서 "todo" 키로 저장된 데이터를 가져와서 defaultTodo에 할당한다.
defaultTodo가 존재하면, 해당 데이터를 todo 상태로 설정하고, 마지막 할 일 ID를 계산하여 todoId 상태로 설정한다.


두번째 useEffect는 : todo 상태가 변경될 때마다(추가,삭제,수정) 실행된다.
todo 상태를 로컬 스토리지에 "todo" 키로 문자열로 변환(JSON.stringify)하여 저장합니다. 


![](https://velog.velcdn.com/images/jungaeeum/post/74e6be71-b5f7-494b-9781-0d8e48f0be19/image.png)



완성!!

할일을 추가하면 포스트잇이 랜덤으로  붙여지고 휴지통 아이콘으로 삭제하기, 완료 포스트잇을 누르면 100% 아이콘이 꽝 찍힌다~!




이걸 나만 이용하면 아까우니(?) 웹사이트로 배포해보자!!




netlify 배포하는 법은 저번 포스팅때 했으니 다시 빌드하는 걸 재배포 하는 방법과 사이트 주소 변경하는 법을 알아보자..!

```npm run build```
꼭 처음에 하는거 잊지 않으셨죠? 업뎃할때도 이전 bulid한걸 삭제하고 다시 빌드하면 된다.

![](https://velog.velcdn.com/images/jungaeeum/post/2c5af99a-2796-4920-9a9a-2f45563cfed2/image.png)

사이트 들어가서 로그인한 다음 Site 목록에서 Deploys 탭을 클릭 !!


저기 동그라미 친 부분에 build 파일을 드래그앤드롭 하면 바로 다시 반영된다!


![](https://velog.velcdn.com/images/jungaeeum/post/8223809b-9397-4d37-81a3-f4ddf8d3f0ec/image.png)


사이트 이름 바꾸는 부분은 이 형광부분으로 들어가면 바꿀수 있음



배포 링크 ▼
https://nipa-frontend-5-todo-jaeum.netlify.app/



<br />

#### *본 후기는 정보통신산업진흥원(NIPA)에서 주관하는 과제 기록으로 작성 되었습니다.

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
