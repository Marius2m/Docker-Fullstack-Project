import React, {useState} from 'react';
import Navigation from './components/Navigation';
import CreateData from './components/CreateData';
import FetchData from './components/FetchData';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({canLogin: false, username: '', password: ''})
  
  const handleUsernameChange = event => {
    setUserData({username: event.target.value});
    return;
  }

  const handlePasswordChange = event => {
    setUserData({password: event.target.value});
    return;
  }

  const authenticate = (event) => {
    if (userData.username.toLocaleLowerCase() === "test" && 
      userData.password.toLocaleLowerCase() === "test") {
        console.log("BEFORE: ", userData);
        setUserData({canLogin: true});
        console.log("AFTER: ", userData);
    } else {
      alert('Entered data:' + userData.username + ' ' + userData.password + '\n'
        + 'User: test | Password: test');
      event.preventDefault();
    }
  }

  return (
    userData.canLogin === true
    ? <BrowserRouter>
      <div className="App">
        <Navigation/>
        <Route path="/" exact component={Home}/>
        <Route path="/createdata" component={CreateData}/>
        <Route path="/fetchdata" component={FetchData}/>
      </div>
    </BrowserRouter>
    : <form className="form" onSubmit={authenticate}>
        <label style={{margin: '10px'}}>
          Username:
          <input 
            placeholder="Username"
            className="form_input" 
            type="text" 
            name="name" 
            value={userData.username || ''} 
            onChange={e => setUserData({...userData, username: e.target.value})}
            />
        </label>
        <label style={{margin: '10px'}}>
          Password:
          <input 
            placeholder="Password"
            className="form_input" 
            type="password" 
            name="name"
            value={userData.password || ''} 
            onChange={e => setUserData({...userData, password: e.target.value})}
            />
        </label>

        <input className="btn" type="submit" value="Authenticate" />
      </form>
  );
}

const Home = () => {

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
};

export default App;
