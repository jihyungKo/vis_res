import React from 'react';
import ReactDOM from 'react-dom/client';
import {Map} from './map';
import {Stuff} from "./stuff";

const reactMap = ReactDOM.createRoot(document.getElementById('react-map'));
reactMap.render(<Map/>);

const reactStuff = ReactDOM.createRoot(document.getElementById('react-stuff'));
reactStuff.render(<Stuff/>);
