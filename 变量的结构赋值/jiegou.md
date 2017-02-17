##解构：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。
1,数组的解构----基本用法
======================
```javascript
//以前赋值
let a=1;
let b=2;
let 3;
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























