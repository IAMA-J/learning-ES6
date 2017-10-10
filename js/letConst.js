/*input.map(item => item+1);*/
{
	let a=1;
	var b=2;
}

//console.log(a,b)

for(let i=0; i<10;i++){
	
	//console.log(i)
	
}
//console.log(i)

var a1=[];
for (var i=0;i<10;i++){
	a1[i]=function(){
		console.log(i)
		
	}
	
	
}

a1[6]();

var b1=[];
for(let i=0;i<10;i++){
	b1[i]=function(){
		console.log(i)
	}
	
}
b1[6]();

function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());




const PI=3.1415926;

PI=3;