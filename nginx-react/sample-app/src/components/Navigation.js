import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signOut} from '../redux/actions/actions';

function Navigation() {
    const dispatch = useDispatch();

    const onSignOut = () => {
        dispatch(signOut());
    }

  return (
      <nav>
        <h3>Test app</h3>
        <ul className="route-links">
            <Link style={{'color': 'white','textDecoration': 'none'}} to='/createdata'>
                <li style={{marginRight: 20}}>CreateData</li>
            </Link>
            <Link style={{'color': 'white','textDecoration': 'none'}} to='/fetchdata'>
                <li style={{marginRight: 20}}>FetchData</li>
            </Link>
            <li onClick={onSignOut} style={{marginLeft: 40, color: '#c32d2d', cursor: 'pointer'}}>Sign Out</li>
        </ul>
      </nav>
    );
}

export default Navigation;
