import TodoList from './components/TodoList';
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import { useCallback, useState } from 'react';
import {v4} from 'uuid';

function App() {
  const [todoList, setTodoList] = useState([]);//array 
  const [textInput, setTextInput] = useState('');//string 

  const onTextInputChange = useCallback((e) => {
      setTextInput(e.target.value);
  },[])

  const onAddButtonClick = useCallback((e) => {
    //Them text input vao danh sach todoList
    setTodoList([
      {id: v4(), name: textInput, isCompleted: false},
      ...todoList
    ]);
    
    setTextInput("");
  },[textInput, todoList]);

  const onCheckBtnClick = useCallback((id)=> {
    setTodoList((prevState) => prevState.map((todo)=>todo.id === id ? {...todo, isCompleted: true}: todo));
  },[])

  return (
    <>
      <h3>Danh sach can lam</h3>
      <Textfield 
        name = "add-todo" 
        placeholder='Them viec can lam' 
        elemAfterInput={
          <Button 
            isDisabled={!textInput} 
            appearance="primary" 
            onClick={onAddButtonClick}>
              Them
          </Button>
        } 
        css={{padding: "2px 40px 2px"}}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>  

        <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;  
