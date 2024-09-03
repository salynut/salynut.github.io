function calcularValores() {
    const sexo = document.getElementById('sexo').value;
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const talla = parseFloat(document.getElementById('talla').value) / 100; // Convertir cm a m

    if (!sexo || isNaN(peso) || isNaN(talla) || !fechaNacimiento) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Calcular la edad en meses
    const hoy = new Date();
    const edadMeses = (hoy.getFullYear() - fechaNacimiento.getFullYear()) * 12 + hoy.getMonth() - fechaNacimiento.getMonth();

    if (edadMeses < 0) {
        alert("La fecha de nacimiento no puede ser futura.");
        return;
    }

    // Calcular IMC
    const imc = peso / (talla * talla);

    // Obtener valores OMS
    const valoresPeso = obtenerValoresOMS('peso', sexo, edadMeses);
    const valoresTalla = obtenerValoresOMS('talla', sexo, edadMeses);
    const valoresIMC = obtenerValoresOMS('imc', sexo, edadMeses);

    // Calcular desviaciones estándar
    const desviacionPeso = (peso - valoresPeso.media) / valoresPeso.desviacionEstandar;
    const desviacionTalla = (talla * 100 - valoresTalla.media) / valoresTalla.desviacionEstandar; // Convertir m a cm para comparar
    const desviacionIMC = (imc - valoresIMC.media) / valoresIMC.desviacionEstandar;

    // Mostrar resultados
    document.getElementById('resultado').innerHTML = `
        <p>Edad: ${Math.floor(edadMeses / 12)} años y ${edadMeses % 12} meses</p>
        <p>Peso: ${peso} kg (Z score: ${desviacionPeso.toFixed(2)})</p>
        <p>Talla: ${(talla * 100).toFixed(1)} cm (Z score: ${desviacionTalla.toFixed(2)})</p>
        <p>IMC: ${imc.toFixed(2)} (Z score: ${desviacionIMC.toFixed(2)})</p>
    `;
}

