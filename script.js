document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el mapa
    const map = L.map('map').setView([-33.45694, -70.64827], 11); // Cambia las coordenadas y el zoom según necesites

    // Añade una capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Cargar los marcadores desde el archivo JSON
    fetch('markers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(markers => {
            // Variable para almacenar el sonido actualmente en reproducción
            let currentSound = null;

            // Recorrer los marcadores obtenidos del JSON
            markers.forEach(marker => {
                const markerIcon = L.divIcon({ className: 'marker' });

                // Crear un marcador para cada objeto del JSON
                const leafMarker = L.marker(marker.coords, { icon: markerIcon }).addTo(map);

                // Agregar la etiqueta (tooltip) al marcador
                leafMarker.bindTooltip(marker.label, { permanent: false, direction: 'top', offset: [0, -10] });

                // Evento de clic para reproducir el sonido asociado
                leafMarker.on('click', () => {
                    // Si ya hay un sonido en reproducción, lo detiene
                    if (currentSound) {
                        currentSound.pause();
                        currentSound.currentTime = 0;
                    }

                    // Reproduce el nuevo sonido
                    currentSound = new Audio(marker.sound);
                    currentSound.play();
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar los marcadores:', error);
        });
});