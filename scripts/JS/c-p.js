function generarInforme() {
    // Obtención de los datos de entrada
    const fecha = document.getElementById('fecha').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const talla = parseInt(document.getElementById('talla').value);
    const brazo = parseInt(document.getElementById('brazo').value);
    const cintura = parseInt(document.getElementById('cintura').value);
    const cadera = parseInt(document.getElementById('cadera').value);
    const grasaCorporal = parseFloat(document.getElementById('grasaCorporal').value);
    const nutricionista = document.getElementById('nutricionista').value;
    
    // Cálculos iniciales
    const pesoLibras = peso * 2.20462;
    const imc = peso / ((talla / 100) ** 2);
    let pesoIdeal = 50 + 0.75 * (talla - 150);

    // Fórmulas para calcular edad metabólica
    const tmb = (sexo === 'masculino') ? 
        ((10 * peso) + (6.25 * talla) - (5 * edad) + 5) * 1.2 :
        ((10 * peso) + (6.25 * talla) - (5 * edad) - 161) * 1.2;

    const edadMetabolica = (sexo === 'masculino') ? 
        (88.362 + (13.397 * peso) + (4.799 * talla) - (tmb / 1.1555)) / 5.677:
        (447.593 + (9.247 * peso) + (3.098 * talla) - (tmb / 1.1555)) / 4.33;

    // Variables de referencia para SaluNut Healthy Score
    const referenciaGrasaCorporal = (sexo === 'masculino') ? 15 : 23;
    const referenciaMasaMuscular = (sexo === 'masculino') ? 59 : 50;

    // Cálculo del SalyNut Healthy Score
    const porcentajeMasaMuscular = ((0.244 * peso + 7.8 * (talla / 100) + (sexo === 'masculino' ? 6.6 : 0) - (0.098 * edad) - 3.3) / peso * 100) * 1.3;
    const salyNutScore = 100 - (
        Math.pow((peso - pesoIdeal) / pesoIdeal, 2) +
        Math.pow((porcentajeMasaMuscular - referenciaMasaMuscular) / referenciaMasaMuscular, 2) +
        Math.pow((grasaCorporal - referenciaGrasaCorporal) / referenciaGrasaCorporal, 2)
    ) * 100;
 // Clasificación de SalyNut Healthy Score
    let clasificacionSHS = '';
    if (salyNutScore < 60) {
        clasificacionSHS = 'Indice de salud deficiente';
    } else if (salyNutScore >= 60 && salyNutScore < 69) {
        clasificacionSHS = 'Indice de salud aceptable';
    } else if (salyNutScore >= 70 && salyNutScore < 79) {
        clasificacionSHS = 'Indice de salud bueno';
    } else if (salyNutScore >= 80 && salyNutScore < 89) {
        clasificacionSHS = 'Indice de salud muy bueno';
    } else if (salyNutScore >= 90) {
        clasificacionSHS = 'Indice de salud excelente';
    } else {
        clasificacionSHS = 'Revisar datos';
    }

    // Clasificación de IMC
    let clasificacionIMC = '';
    if (imc < 18.5) {
        clasificacionIMC = 'Por debajo del peso normal';
    } else if (imc >= 18.5 && imc < 25) {
        clasificacionIMC = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        clasificacionIMC = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        clasificacionIMC = 'Obesidad grado I';
    } else if (imc >= 35 && imc < 40) {
        clasificacionIMC = 'Obesidad grado II';
    } else {
        clasificacionIMC = 'Obesidad grado III';
    }

    // Cálculo de peso saludable mínimo y máximo
    const pesoSaludableMin = ((talla / 100) ** 2) * 18.5;
    const pesoSaludableMax = ((talla / 100) ** 2) * 25;

    // Cálculo de grasa corporal en kg
    const grasaCorporalKg = grasaCorporal * peso / 100;

    // Análisis de grasa corporal
    let clasificacionGrasa = '';
    if (sexo === 'masculino') {
        if (grasaCorporal < 6) clasificacionGrasa = 'Bajo';
        else if (grasaCorporal <= 13) clasificacionGrasa = 'Excelente';
        else if (grasaCorporal <= 17) clasificacionGrasa = 'Bueno';
        else if (grasaCorporal <= 25) clasificacionGrasa = 'Sobrepeso';
        else clasificacionGrasa = 'Obesidad';
    } else {
        if (grasaCorporal < 14) clasificacionGrasa = 'Bajo';
        else if (grasaCorporal <= 21) clasificacionGrasa = 'Excelente';
        else if (grasaCorporal <= 25) clasificacionGrasa = 'Bueno';
        else if (grasaCorporal <= 32) clasificacionGrasa = 'Sobrepeso';
        else clasificacionGrasa = 'Obesidad';
    }

    // Cálculo de masa muscular en kg
    const masaMuscularKg = porcentajeMasaMuscular * 100 / peso;

    // Cálculo de riesgo metabólico
    const icc = cintura / cadera;
    let riesgoMetabolico = '';
    if (icc < 0.89) {
        riesgoMetabolico = 'Sin riesgo';
    } else {
        riesgoMetabolico = 'Riesgo cardio metabólico';
    }

    let riesgoComorbilidad = '';
    if (cintura < 90) {
        riesgoComorbilidad = 'Sin riesgo';
    } else if (cintura <= 102) {
        riesgoComorbilidad = 'Riesgo moderado';
    } else {
        riesgoComorbilidad = 'Riesgo alto';
    }

    // Mostrar resultados
    document.getElementById('resultado').innerHTML = 
    
    `
<pre style="font-family: Times New Roman,Times,serif; text-align: center;"><h2>Informe de Composición Corporal</h2>
<pre style="font-family: Times New Roman,Times,serif; text-align: right;"><strong>Fecha de Medición:</strong> ${fecha}
<pre style="text-align: left; font-family: Times New Roman,Times,serif;"><strong>Nombre:</strong> ${nombre} ${apellido}       <strong>|   Edad:</strong> ${edad} años<br>
<strong>Sexo:</strong> ${sexo.charAt(0).toUpperCase() + sexo.slice(1)}    <strong>|   Talla:</strong> ${talla} cm     <strong>|   Peso:</strong> ${peso} kg (${pesoLibras.toFixed(2)} lbs)<br>
<strong>Circunferencia de Cintura:</strong> ${cintura} cm     <strong>|   Circunferencia de Cadera:</strong> ${cadera} cm
<strong>___________________________________________________________</strong><br>
<strong>SalyNut Healthy Score:</strong>  ${salyNutScore.toFixed(2)}    <strong>|    </strong>${clasificacionSHS}<br>
<strong>Edad Metabólica:</strong> ${edadMetabolica.toFixed(0)} años    <strong>|    Requerimiento calórico:</strong> ${tmb.toFixed(0)} Kcal  
<strong>___________________________________________________________</strong>
<h3>Análisis de Peso</h3>
<strong>IMC:</strong> ${imc.toFixed(2)} (${clasificacionIMC})<br>
<strong>Peso Saludable Mínimo:</strong> ${pesoSaludableMin.toFixed(2)} kg      (${(pesoSaludableMin * 2.20462).toFixed(2)} lbs)<br>
<strong>Peso Saludable Máximo:</strong> ${pesoSaludableMax.toFixed(2)} kg      (${(pesoSaludableMax * 2.20462).toFixed(2)} lbs)<br>
<strong>Peso Ideal:</strong> ${pesoIdeal.toFixed(2)} kg      (${(pesoIdeal * 2.20462).toFixed(2)} lbs)<br>
<strong>Porcentaje de Peso Ideal:</strong> ${(peso / pesoIdeal * 100).toFixed(2)}%
<strong>___________________________________________________________</strong>
<h3>Análisis de Grasa Corporal</h3>
<strong>Porcentaje de Grasa Corporal:</strong> ${grasaCorporal}%<br>
<strong>Grasa Corporal en kg:</strong> ${grasaCorporalKg.toFixed(2)} kg<br>
<strong>Clasificación de Grasa Corporal:</strong> ${clasificacionGrasa}
<strong>___________________________________________________________</strong>
<h3>Análisis de Masa Muscular</h3>
<strong>Porcentaje de Masa Muscular:</strong> ${porcentajeMasaMuscular.toFixed(2)}%<br>
<strong>Masa Muscular en kg:</strong> ${masaMuscularKg.toFixed(2)} kg
<strong>___________________________________________________________</strong>
<h3>Riesgo Metabólico</h3>
<strong>Índice Cintura-Cadera:</strong> ${icc.toFixed(2)}<br>
<strong>Riesgo Cardio Metabólico:</strong> ${riesgoMetabolico}<br>
<strong>Riesgo de Comorbilidad:</strong> ${riesgoComorbilidad}
<strong>___________________________________________________________</strong><br>
<strong>Informe realizado por:</strong>${nutricionista}<br><br><br><br><br><br>
Análisis antropométrico generado por SalyNut Healthy Score. www.salynut.com
    `;
}

function imprimirInforme() {
    const reportContent = document.getElementById('resultado').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = reportContent;

    window.print();

    document.body.innerHTML = originalContent;
    
}

