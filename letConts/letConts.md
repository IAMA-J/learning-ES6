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
