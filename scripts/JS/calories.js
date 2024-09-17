function calcularGastoCalorico() {
            var gender = document.getElementById("gender").value;
            var age = parseInt(document.getElementById("age").value);
            var weight = parseFloat(document.getElementById("weight").value);
            var height = parseFloat(document.getElementById("height").value);
            var formula = document.getElementById("formula").value;
            var activity = parseFloat(document.getElementById("activity").value);

            var GEB = 0; // Gasto Energético Basal

            // Fórmula de Harris-Benedict
            if (formula === "harris") {
                if (gender === "male") {
                    GEB = (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    GEB = (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
            }

            // Fórmula de FAO/OMS
            if (formula === "fao") {
                if (gender === "male") {
                    if (age <= 3) {
                        GEB = (60.9 * weight) - 54;
                    } else if (age <= 10) {
                        GEB = (22.7 * weight) + 495;
                    } else if (age <= 18) {
                        GEB = (17.5 * weight) + 651;
                    } else if (age <= 30) {
                        GEB = (15.3 * weight) + 679;
                    } else if (age <= 60) {
                        GEB = (11.6 * weight) + 879;
                    } else {
                        GEB = (13.5 * weight) + 487;
                    }
                } else { // Mujeres
                    if (age <= 3) {
                        GEB = (61.0 * weight) - 51;
                    } else if (age <= 10) {
                        GEB = (22.5 * weight) + 499;
                    } else if (age <= 18) {
                        GEB = (12.2 * weight) + 746;
                    } else if (age <= 30) {
                        GEB = (14.7 * weight) + 496;
                    } else if (age <= 60) {
                        GEB = (8.7 * weight) + 829;
                    } else {
                        GEB = (10.5 * weight) + 596;
                    }
                }
            }

            // Cálculo del Gasto Energético Total (GET)
            var GET = GEB * activity;

            // Mostrar los resultados
            document.getElementById("result").innerHTML = `
                <strong>Gasto Energético Basal (GEB):</strong> ${GEB.toFixed(2)} Kcal<br>
                <strong>Gasto Energético Total (GET):</strong> ${GET.toFixed(2)} Kcal
            `;
        }
