##解构：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。
1,数组的解构----基本用法
======================
```javascript
//以前赋值
let a=1;
let b=2;
let c=3;
//ES6可以这样写：
let [a,b,c]=[1,2,3];
```
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
如果解构不成功，变量的值就等于undefined。这种情况一般是右边不等于左边
```javascript
let [bar, foo] = [1];
console.log(foo);//undefined
```
另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况是右边等于左边，但是多余左边。
2,默认值
==================
解构赋值允许指定默认值。
```javascript
let [x,y = 'a']=['c',undefined]
console.log(x,y);//c,a
```
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
2,对象的解构----基本用法
======================
```javascript
let {foo,bar}={foo:'aaa',bar:'bbb'}
console.log(foo,bar)
```
数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。  
实际上面的写法由下面简写的：
```javascript
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```
说明，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。既前边是同属名，后边为变量。  
故有此写法：
```javascript
let {foo:baz}={foo:'aaa',bar:'111'};
console.log(baz);//console.log(foo)==>>foo is not defined
```
上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

和数组一样，解构也可以用于嵌套结构的对象。
```javascript
let obj={
	p:['hello',{y:'world'}]
}
let {p:[x,{y}]}=obj;
console.log(x,y)
```
对象的解构也可以指定默认值。
```javascript
var {x=3}={};
console.log(x);//3

var {y=3}={y:undefined}
console.log(y);//3

var {z=3}={z:null};
console.log(z);//null
```
如果x属性等于null，就不严格相等于undefined，导致默认值不会生效。
如果解构失败，变量的值等于undefined。

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
```javascript
let arr=[1,2,3];
let {0:first,[arr.length-1]:last}=arr;
console.log(first,last);//1,3
```
上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。方括号这种写法，属于“属性名表达式”

3.字符串的解构赋值
===============================
```javascript
const [a,b,c,d,e]='hello';
console.log(a,b,c,d,e);//h,e,l,l,o
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```javascript
let {length:len}='hello'
console.log(len);//5
```
4,数组和布尔值的解构
==========================
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```javascript
let {toString: s}=123;
console.log(s === Number.prototype.toString );//true，一定要这样写，不能直接console.log(s)

let {toString: z}=true;
console.log(z === Boolean.prototype.toString );//true，一定要这样写，不能直接console.log(z);
```
数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。
```javascript
let {aa:x}=undefined;
console.log(x);
let {bb:y}=null;
console.log(y)
```
由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

5.函数参数的结构赋值	
这是一个最常用的例子
```javascript
function add([x,y]){
	return x+y;
};
let num=add([1,2]);
console.log(num);//3
```
```javascript
[[1,2],[3,4]].map(([a,b]) => console.log(a+b));
```
函数参数的解构也可以使用默认值。
```javascript
function add({x=0,y=0}){
	console.log(x+y);
};
add({x:3,y:1});//4
```
6.用途
(1)交换变量的值
```javascript
let x=1;
let y=2;
[x,y]=[y,x];
console.log([x,y]);//2,1
```
(2)从函数返回多个值
```javascript
//返回一个数组
function example(){
	return [1,2,3]
}
let [a,b,c]=example();
console.log([a,b,c]);//1,2,3
//返回一个对象
function example(){
	return {
		foo:1,
		bar:2
	};
}
let {foo,bar}=example();
console.log({foo,bar});//{foo:1,bar:2}
```
(3)函数参数的定义
```javascript
//数组
function add([x,y,z]){
	return x+y+z;
};
var num=add([1,2,3]);
console.log(num)
//对象
function add({x,y,z}) {
	return x+y+z;
}
let num=add({z:3,y:2,x:0});
console.log(num)
```
(4)提取json数据
```javascript
let jsonData={
	id:42,
	status:'ok',
	data:[1,2]
};
let {id,status,data:number}=jsonData;
console.log(id,status,number);//42,'ok',[1,2]
```
(5)函数参数的默认值
(6)遍历Map结构
(7)输入模块的指定方法




