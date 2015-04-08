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
/* jshint ignore:start */
React.render(<HelloMessage  name='Webpack & ReactJs !'/>, document.getElementById('app'));
/* jshint ignore:end */
