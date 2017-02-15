一.export命令
=======================
###模块功能主要由两个命令构成：export和import。 
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
####1,用export命令对外部输出变量
```javascript
//home.js文件
export var year=1999;
```
另一种写法
```javascript
//home.js文件
var a=10;
var b=20;
var c=30;
export {a,b,c}
```
####2,export命令除了输出变量，还可以输出函数或类（class）。
```javascript
//home.js文件
export function multiply (x,y){
  return x*y;
}
```
通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
```javascript
//home.js文件
var a=10;
var b=20;
export{
  a as aa,
  b as bb
}
```
重命名后，a可以用不同的名字输出两次，分别是a和aa。
####3,export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。  
不可这样写：
```javascript
var a=1;
export a;
``` 
或者：
```javacript
export 1;
```
接口名与模块内部变量之间，建立了一一对应的关系。
export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
```javascript
//home.js文件
export var foo='bar';
setTimeout(()=>foo='bat',500);//上面代码输出变量foo，值为bar，500毫秒之后变成baz。
```
####4,export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
```javascript
function foo(){
  export default 'bar';//export语句放在函数之中，结果报错。
}
```
二.export命令
=======================
####1,使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
```javascript
//main.js文件
import {a,b,c} from './home';
function add(){
    var d=a+b+c;
}
```
上面代码的import命令，用于加载home.js文件，并从中输入变量,.js可以不写。  
import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。     
####2,如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
```javascript
import {a as aa} from './home';
```
####3,import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js路径可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。






















