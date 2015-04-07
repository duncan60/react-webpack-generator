/*
*require css
*/
import 'bootstrap.css';
import '../assets/styles/style';
import '../assets/styles/compass.style';


/*
*require react
*/

import React from 'react';
import HelloMessage from './HelloMessage';

React.render(<HelloMessage  name='Webpack & ReactJs !'/>, document.getElementById('app'));
