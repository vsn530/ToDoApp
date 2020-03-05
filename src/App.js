import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Dashboard from './components/Dashboard';
import logo from './logo.svg';
import { Data } from './MockData';
import './App.css';

import { fetchTodos } from './store/actions/actions';

const App = props => {
  const { dispatch, setData }  = props;
  useEffect(()=>{
    //TODO: Make async call to fetch todos data
    //dispatch(fetchTodos([{a:1, b:2}]))
    setData(Data);
  },[]);

  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setData : data => dispatch(fetchTodos(data))
})

export default connect(null, mapDispatchToProps)(App);
