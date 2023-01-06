
function calcularIMC() {
var peso = eval(document.form.peso.value)
var alt = eval(document.form.alt.value)
var alt2 = alt / 100
var IMC = peso / (alt2 * alt2)
var PIM = 18 * (alt2 * alt2)
var PIN = 25 * (alt2 * alt2)
var PII = 22.5 * (alt2 * alt2)
document.form.PIM.value=custRound(PIM,1);
document.form.PIN.value=custRound(PIN,1);
document.form.PII.value=custRound(PII,1);
document.form.massacor.value=custRound(IMC,1);
if (document.form.massacor.value <18.5)
document.form.comment.value = "Bajo Peso";
if (document.form.massacor.value >=18.5 && document.form.massacor.value <=24.9)
document.form.comment.value = "Normo Peso";
if (document.form.massacor.value >=25 && document.form.massacor.value <=29.9)
document.form.comment.value = "Sobre Peso";
if (document.form.massacor.value >=30 && document.form.massacor.value <=34.9)
document.form.comment.value = "Obesidad Tipo I";
if (document.form.massacor.value >=35 && document.form.massacor.value <=39.9)
document.form.comment.value = "Obesidad Tipo II";
if (document.form.massacor.value >=40 && document.form.massacor.value <=49.9)
document.form.comment.value = "Obesidad Mórbida";
if (document.form.massacor.value >40)
document.form.comment.value = "Obesidad Extrema";}
function custRound(x,places) {
return (Math.round(x*Math.pow(10,places)))/Math.pow(10,places)}

