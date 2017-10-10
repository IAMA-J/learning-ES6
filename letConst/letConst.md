1.let命令
================
###基本语法
let所声明的变量，只在let命令所在的代码块内有效。
```javascript
<script type="module">
	{
    let a=10;
    var b=20;
  }
  console.log(a);//报错,a is not defined.
  console.log(b);//输出20
  </script>
```
for循环的计数器，就很合适使用let命令。
```javascript
var a1=[];
for (var i=0;i<10;i++){
	a1[i]=function(){
		console.log(i)
		
	}
	
	
}
a1[6]();
```
i为全局变量，数组中i都是指向同一个i,i最后为10.
```javascript
var b1=[];
for(let i=0;i<10;i++){
	b1[i]=function(){
		console.log(i)
	}
	
}
b1[6]();
```
i只在本轮循环有效，每一次循环的i都是一个新的变量。
```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```
循环变量的那部分是一个父作用域，而循环提内部是一个单独的子作用域。函数内部的变量i和循环变量i不在同一个作用域，有各自单独的作用域。

###不存在变量提升
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
###不允许重复声明
let不允许在相同作用域内，重复声明同一个变量。
2.块级作用域
===========================
let为javascript新增了块级作用域
```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
最后输出5，这表示外层代码不受内层代码的影响。
###ES6允许块级作用域的任意嵌套。
```javascript
{{{{{let insane = 'Hello World'}}}}};
```
###外层作用域无法读取内层作用域的变量。
###内层作用域可以定义外层作用域的同名变量。
###ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
```javascript
if (true) {
  function f() {
  	console.log(111)
  } // 不报错
  f();
}
```
允许在块级作用域内声明函数。
函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
同时，函数声明还会提升到所在的块级作用域的头部。
3.const命令
==================
const声明一个只读的常量。一旦声明，常量的值就不能改变。
const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const的作用域与let命令相同：只在声明所在的块级作用域内有效。
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
const声明的常量，也与let一样不可重复声明。
