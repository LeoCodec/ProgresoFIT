document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales (pueden venir de una base de datos o API)
    const progressData = {
        startWeight: 122.1,  // Peso inicial (kg)
        currentWeight: 122.1, // Peso actual (kg)
        targetWeight: 85,    // Peso objetivo (kg)
        lastUpdate: '19/04/2025' // Fecha último registro
    };

    // Calcular progreso
    function calculateProgress() {
        const totalToLose = progressData.startWeight - progressData.targetWeight;
        const alreadyLost = progressData.startWeight - progressData.currentWeight;
        const percentage = Math.max(0, Math.min(100, (alreadyLost / totalToLose) * 100));
        return Math.round(percentage);
    }

    // Actualizar la barra de progreso
    function updateProgressBar() {
        const percentage = calculateProgress();
        const progressBar = document.getElementById('progressBar');
        
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '% completado';
        
        // Cambiar color según progreso
        if (percentage < 30) {
            progressBar.style.backgroundColor = '#FF6B6B'; // Rojo
        } else if (percentage < 70) {
            progressBar.style.backgroundColor = '#FFD700'; // Amarillo
        } else {
            progressBar.style.backgroundColor = '#4CAF50'; // Verde
        }
        
        // Actualizar detalles
        document.getElementById('currentWeight').textContent = progressData.currentWeight;
    }

    // Simular nueva entrada de datos (esto sería reemplazado por tu lógica real)
    function simulateNewData(newWeight, date) {
        progressData.currentWeight = newWeight;
        progressData.lastUpdate = date;
        updateProgressBar();
        saveProgressData(); // Guardar en localStorage
    }

    // Guardar datos en localStorage
    function saveProgressData() {
        localStorage.setItem('weightProgress', JSON.stringify(progressData));
    }

    // Cargar datos guardados
    function loadProgressData() {
        const savedData = localStorage.getItem('weightProgress');
        if (savedData) {
            Object.assign(progressData, JSON.parse(savedData));
        }
    }

    // Inicializar
    loadProgressData();
    updateProgressBar();

    // Ejemplo de cómo actualizar cuando subes nueva foto (esto lo adaptarías a tu flujo real)
    window.uploadNewWeight = function(newWeight, date) {
        simulateNewData(newWeight, date);
        alert(`¡Nuevo registro actualizado! ${newWeight}kg (${date})`);
    };
});