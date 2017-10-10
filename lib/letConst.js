'use strict';

/*input.map(item => item+1);*/
{
	var a = 1;
	var b = 2;
}

//console.log(a,b)

for (var _i = 0; _i < 10; _i++) {}

//console.log(i)

//console.log(i)

var a1 = [];
for (var i = 0; i < 10; i++) {
	a1[i] = function () {
		console.log(i);
	};
}

a1[6]();

var b1 = [];

var _loop = function _loop(_i2) {
	b1[_i2] = function () {
		console.log(_i2);
	};
};

for (var _i2 = 0; _i2 < 10; _i2++) {
	_loop(_i2);
}
b1[6]();

function f() {
	console.log('I am outside!');
}

(function () {
	if (false) {
		// 重复声明一次函数f
		var _f = function _f() {
			console.log('I am inside!');
		};
	}

	f();
})();


