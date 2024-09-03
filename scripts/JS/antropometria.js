function generateReport() {
    // Captura los datos introducidos
    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const waist = document.getElementById('waist').value;
    const hip = document.getElementById('hip').value;

    // Calcula el IMC
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    // Calcula la relación cintura-cadera
    const whr = (waist / hip).toFixed(2);

    // Genera el contenido del informe
    const reportContent = `
        <h2>Informe de Antropometría</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Peso:</strong> ${weight} kg</p>
        <p><strong>Talla:</strong> ${height} cm</p>
        <p><strong>Circunferencia de Cintura:</strong> ${waist} cm</p>
        <p><strong>Circunferencia de Cadera:</strong> ${hip} cm</p>
        <p><strong>IMC:</strong> ${bmi}</p>
        <p><strong>Relación Cintura-Cadera:</strong> ${whr}</p>
        <button onclick="printReport()">Imprimir o Exportar a PDF</button>
    `;

    // Muestra el informe
    document.getElementById('report').innerHTML = reportContent;
}

function printReport() {
    const reportContent = document.getElementById('report').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = reportContent;

    window.print();

    document.body.innerHTML = originalContent;
}

