import React, {useState} from 'react';
import Navigation from './components/Navigation';
import CreateData from './components/CreateData';
import FetchData from './components/FetchData';
import {BrowserRouter, Route} from 'react-router-dom';
import {getMongoStatus} from './apis/getMongoStatus';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from './redux/actions/actions';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({canLogin: false, username: '', password: ''})
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const authenticate = async (event) => {
    if (userData.username.toLocaleLowerCase() === "test" && 
      userData.password.toLocaleLowerCase() === "test") {
        let response = await getMongoStatus();

        if (response.status === 200) {
          console.log(response.data["mongo-status"]);
          dispatch(auth());
        } else {          
          alert('Database is not online!');
        }
    } else {
      alert('Entered data:' + userData.username + ' ' + userData.password + '\n'
        + 'User: test | Password: test');
    }
  }

  return (
    authState.isAuthenticated === true
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
        <button  
          className="btn" 
          type="button"
          onClick={authenticate}>
          Authenticate
        </button>
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
