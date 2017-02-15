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
