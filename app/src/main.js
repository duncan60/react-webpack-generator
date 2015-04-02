/*
*require css
*/
import 'bootstrap.css';
import '../assets/styles/style';
import '../assets/styles/styleA';

/*
*require react
*/

import React from 'react';
import HelloMessage from './HelloMessage';

React.render(<HelloMessage  name="Webpack & React"/>, document.getElementById('app'));
