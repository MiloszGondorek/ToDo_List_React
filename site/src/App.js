import React from 'react';
import './App.css';
import { ToDoList, NewToDo, FinishedList } from './TodoElement.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef()
  }

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <NewToDo />
        <div className='topLines'>
          <span className='leftLine Line' />
          <span className='rightLine Line' />
        </div>
        <div className='listElements'>
          <ToDoList clear={() => this.content.update() }/>
        </div>
        <FinishedList ref={instance => { this.content = instance; }}/>
        <span className='bottomLine Line' />
        <form className='report'>
          <h1>Report a bug</h1>
          <input placeholder='Title...' />
          <textarea placeholder='Message content...' />
          <button type='submit'>Send</button>
        </form>
        <footer>
          <p>Milosz Gondorek</p>
          <p>Icons: https://www.flaticon.com</p>
        </footer>
      </div>
    );
  }
}

export default App;
