/*
*require css
*/
import 'bootstrap.css';
import '../assets/styles/style';

//require('../assets/styles/styleA.scss');

import React from 'react';
import HelloMessage from './HelloMessage';

React.render(<HelloMessage  name="Webpack React"/>, document.getElementById('app'));
