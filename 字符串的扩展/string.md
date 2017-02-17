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

























