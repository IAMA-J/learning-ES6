一.export命令
=======================
####模块功能主要由两个命令构成：export和import。 
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
##export命令
#####1,用export命令对外部输出变量
```javascript
export var year=1999;
```
另一种写法
```javascript
var a=10;
var b=20;
var c=30;
export {a,b,c}
```
#####2,export命令除了输出变量，还可以输出函数或类（class）。
```javascript
export function multiply (x,y){
  return x*y;
}
```
通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
```javascript
var a=10;
var b=20;
export{
  a as aa,
  b as bb
}
```
重命名后，a可以用不同的名字输出两次，分别是a和aa。
