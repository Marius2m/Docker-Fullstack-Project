import React, {useState} from 'react';
import Navigation from './components/Navigation';
import CreateData from './components/CreateData';
import FetchData from './components/FetchData';
import {BrowserRouter, Route} from 'react-router-dom';
import {getMongoStatus} from './apis/getMongoStatus';
import {useSelector, useDispatch} from 'react-redux';
import {auth} from './redux/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './App.css';

const App = () => {
  const classes = useStyles();
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
    : <div className="container">
        <form className="formStyle" onSubmit={authenticate}>
          <TextField
            id="outlined-with-placeholder"
            label="Username"
            placeholder="Username"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={userData.username || ''} 
            onChange={e => setUserData({...userData, username: e.target.value})}
          />
          <TextField
            id="outlined-with-placeholder"
            label="Password"
            type="password"
            placeholder="Password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={userData.password || ''} 
            onChange={e => setUserData({...userData, password: e.target.value})}
            />
          <button  
            className="btn" 
            type="button"
            onClick={authenticate}>
            Authenticate
          </button>
        </form>
      </div>
  );
}

const Home = () => {

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default App;
