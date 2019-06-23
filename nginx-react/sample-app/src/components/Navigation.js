import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
  return (
      <nav>
        <h3>Test app</h3>
        <ul class="route-links">
            <Link style={{'color': 'white','text-decoration': 'none'}} to='/createdata'>
                <li style={{marginRight: 20}}>CreateData</li>
            </Link>
            <Link style={{'color': 'white','text-decoration': 'none'}} to='/fetchdata'>
                <li>FetchData</li>
            </Link>
        </ul>
      </nav>
    );
}

export default Navigation;
