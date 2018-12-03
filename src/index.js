// import { cube } from './math.js'; 
import React from 'react';
import ReactDom from 'react-dom';
import Hellow from './component/Hellow/Hellow';
import getRouter from './router/router';

 
ReactDom.render(
    getRouter(), document.getElementById('app')
);
 
 
 
