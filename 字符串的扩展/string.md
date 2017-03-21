1.字符的Unicode表示法
==========================
JavaScript允许采用\uxxxx形式表示一个字符，其中“xxxx”表示字符的码点。即使直接使用\u****,则浏览器会识别相应的字符。
```javascript
console.log('\u0061');//浏览器输出a
```
但是，这种表示法只限于\u0000——\uFFFF之间的字符,既是4个。超出这个范围的字符，必须用两个双字节的形式表达。
```javascript
console.log('\uD842\uDFB7');//"𠮷"
```
如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7）（5个），，JavaScript会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
##ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
```javascript
console.log('\u{20BB7}');
console.log('\u{41}\u{42}\u{43}');
```
大括号表示法与四字节的UTF-16编码是等价的。
```javascript
'\u{1F680}' === '\uD83D\uDE80'
// true,没试出来
```
js共有6种方法可以表示一个字符。
```javascript
console.log('\z');
/*console.log('\172');*///语法报错，说在严格模式下不支持8进制
console.log('\x7A');
console.log('\u007A');
console.log('\u{7A}')
```
2.codePointAt()
===========================
JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
汉字“𠮷”（注意，这个字不是”吉祥“的”吉“）的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。
```javascript
var s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97
```
codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
3.string.fromCodePoint()
===========================
ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。
```javascript
console.log(String.fromCodePoint(0x20BB7));//𠮷
```
4.字符串的遍历器接口
===================================
ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
```javascript
for (let i of "hello") {
  		console.log(i);//h,e,l,l,o
  	}
 ```
 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
```javascript
  	var text = String.fromCodePoint(0x20BB7);
    for (let i = 0; i < text.length; i++) {
      console.log(text[i]);
    }
    // " "
    // " "

    for (let i of text) {
      console.log(i);
    }
```
5.at()
========================
ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
目前，有一个提案，提出字符串实例的at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。
```javascript
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```
但是这个方法不能直接用，必须通过<a href="https://github.com/es-shims/String.prototype.at">垫片库</a>去引用。
7.includes(), startsWith(), endsWith()
============================================
字符串查找新添加的三个方法：
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
```javascript
let str="stand up,please!"
console.log(str.includes('lea'));//true,是否存在这个字符串
console.log(str.startsWith('ta'));//false,是否以这个字符串开头
console.log(str.endsWith('!'));//true,是否以这个字符串结尾
```
这三个方法都支持第二个参数，表示开始搜索的位置。
```javascript
console.log(str.includes('up',5));//true
console.log(str.startsWith(',',7));//fasle
console.log(str.endsWith('stand',5));//true
```
上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
8.repeat()
==========================
repeat方法返回一个新字符串，表示将原字符串重复n次。
```javascript
console.log('hello'.repeat(2));//hellohello
```
参数如果是正数小数，会被向下取整。
```javascript
console.log('hello'.repeat(2.9));//hellohello
``` 
参数如果是小于-1的负数，会报错，但是如果参数在0~-1之间的负小数，会向上取整为0.
```javascript
console.log('hello'.repeat(-0.5));//'',为空。
``` 
参数如果是Infinity，会报错。  
参数如果是NaN，会等同于0.
9.padStart()，padEnd()
=================================
在MDN中显示，这两个方法正在测试中：This is an experimental technology。
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
10.模板字符串
======================================
模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

普通字符:如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
```javascript
console.log(`hello baby boy!`);//hello baby boy!
```
多行字符：如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
```javascript
console.log(`string line 1
one two three	
`)
/*
string line 1
one two three	
*/
```
嵌入变量：在模板中使用${变量名}。大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
```javascript
//普通的变量
let name='Roli'
console.log(`hello,${name}`);hello,Roli
//表达式
let a=1,b=2;
console.log(`${a+b}`)
//对象的引用的
var obj={a:2,b:5};
console.log(`a+b=${obj.a+obj.b}`);//a+b=7
```













