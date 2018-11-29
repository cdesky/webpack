import { cube } from './math.js'; 


if (process.env.NODE_ENV !== 'production') {
    alert('Looks like we are in development mode!');
}
else
    alert('在生产环境')

function component() {
var element = document.createElement('pre');
 
// lodash 是由当前 script 脚本 import 导入进来的 
element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equaafsl to ' + cube(5)
].join('\n\n');

return element;
}

document.body.appendChild(component());
