import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css"

function App() {
  //useStateは、関数コンポーネントのstateを保持したり、更新したりするためのフック(下記記述方法)
  //const [stateの変数, stateを更新する関数] = useState(stateの初期値)
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value);
  }

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);
    //新しいTodoを作成
    const newTodo: Todo = {
      inputValue:inputValue,
      id: todos.length,
      checked: false,
    };

  // 上記のhandleSubmitはconstで関数宣言とみなしてくれているが下記のhandleEditは宣言として
  // 認識してもらえない理由が不明
  // const handleEdit = (id:number , inputValue:string) => {
  //     const newTodos = todos.map((todo) => {
  //       if(todo.id === id){
  //         todo.inputValue = inputValue;
  //       }
  //       return todo;
  //     });
  //     setTodos(newTodos);
  //   };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  function handleEdit(id: number, inputValue: string): void {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleChecked = (id:number , checked:boolean) =>{
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleDelete = (id:number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2 className="title">Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handelSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText"/>
          <input type="submit" value="作成" className="submitButton"/>
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text"
                onChange={(e) => handleEdit(todo.id,e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}/>
              <input type="checkbox"
                onChange={(e) => handleChecked(todo.id , todo.checked)}
                />
                <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
