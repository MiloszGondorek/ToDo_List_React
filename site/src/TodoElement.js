import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

class NewToDo extends React.Component {
  render() {
    return <form action="../../add" method="post" className='NewToDo'>
      <input autoComplete="off" placeholder='New task...' name='val' />
      <button><img src={require('./icons/checked.png')} draggable='false' /></button>
    </form>;
  }
}

class ToDoElement extends React.Component {
  constructor(props) {
    super(props);
  } 
  
  render() {
    return <div className='ToDoElement'>
      <p>
        {this.props.name}
      </p>
      <div className='todoButtons' >
        <img src={require('./icons/checked.png')} draggable='false' onClick={() => { axios.post('././finish', { id: this.props.id }); this.props.checkTasks();this.props.fun() }} />
        <img src={require('./icons/bin.png')} draggable='false' onClick={() => axios.post('././delete', { id: this.props.id })} />
      </div>
    </div>;
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [1],
      listItems: []
    }
    this.checkTasks = this.checkTasks.bind(this);
  }
  
  checkTasks() {
    const def=()=>{this.props.clear()};

    const that = this;
    fetch('././getData/inProgress').then(function (response) { return response.json(); }).then(function (jsonData) {
      return JSON.stringify(jsonData);
    })
      .then(function (jsonStr) {
        that.setState({
          data: jsonStr,
          listItems: JSON.parse(jsonStr).map((val, k) => <ToDoElement checkTasks={that.checkTasks} fun={def} name={val['value'].toString()} id={val['id'].toString()} key={k} />)
        })
      });
  }

  componentDidMount() {
    this.checkTasks();
  }
  render() {
    return (this.state.listItems);
  }
}

class FinishedElement extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='ToDoElement'>
      <p>
        {this.props.name}
      </p>
    </div>;
  }
}

class FinishedList extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [1],
      listItems: []
    }
    this.checkTasks = this.checkTasks.bind(this);
  }

  update(){
    this.checkTasks();
  }

  checkTasks() {
    const that = this;
    fetch('././getData/finished').then(function (response) { return response.json(); }).then(function (jsonData) {
      return JSON.stringify(jsonData);
    })
      .then(function (jsonStr) {
        that.setState({
          data: jsonStr,
          listItems: JSON.parse(jsonStr).map((val, k) => <FinishedElement name={val['value'].toString()} id={val['id'].toString()} key={k} />)
        })
      });
  }


  componentDidMount() {
    this.checkTasks();
  }

  render() {
    return (this.state.listItems.length > 0) ? (
      <div className='finishedTasks'>
        <span className='bottomLine Line' />
        <h1>Finished Tasks</h1>
        {this.state.listItems}
      </div>
    ) : (<></>);
  }
}



export { ToDoList, NewToDo, FinishedList };
