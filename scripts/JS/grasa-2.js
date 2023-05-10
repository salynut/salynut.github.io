function calcular() {
	var altura = parseInt(document.getElementById("altura").value);
	var peso = parseInt(document.getElementById("peso").value);
	var edad = parseInt(document.getElementById("edad").value);
	var genero = document.getElementById("genero").value;
	
	var grasa_corporal = 0;
	
	if (genero == "hombre") {
		grasa_corporal = (0.2 * peso) + (0.13 * altura) - (10.8 * 1) - 5.4;
	} else if (genero == "mujer") {
		grasa_corporal = (0.2 * peso) + (0.13 * altura) - (10.8 * 0) - 5.4;
	}
	
	document.getElementById("resultado").value = grasa_corporal.toFixed(2) + "%";
}
