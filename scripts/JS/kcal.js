function calculo(){
var z = document.getElementById("sexo").value;
var y = document.getElementById("talla").value;
var t = document.getElementById("peso").value;
var p = document.getElementById("edad").value;

var a=66.473;
var b=13.752;
var c=b*t;
var d=5.0033;
var e=100;
var f=y*e;
var g=d*f;
var h=6.755;
var i=h*p;
var j=655.0955;
var k=9.563;
var l=k*t;
var m=1.8496;
var o=m*f;
var q=4.6756;
var r=q*p;
var s=(a+c+g-i).toFixed(0);
var u=(j+l+o+r).toFixed(0);
var v = 0;
var w = 1.2;
var total = v.toFixed();
  
  
if (z=="M" || z=="m")
  {
  v=s*w;
  }
if (z=="F" || z=="f")
  {
  v=u*w;
  }
   
document.getElementById("demo").innerHTML= Math.round(v)+" Kcal";
}
