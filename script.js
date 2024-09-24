document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el mapa
    const map = L.map('map').setView([-33.45694, -70.64827], 11); // Cambia las coordenadas y el zoom según necesites

    // Añade una capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Ejemplo de coordenadas de indicadores
    const markers = [
        { id: 'marker1', coords: [19.4326, -99.1332], sound: 'sounds/sound1.mp3', label: 'Ciudad de México' }, // Ciudad de México
        { id: 'marker2', coords: [25.6866, -100.3161], sound: 'sounds/sound2.mp3', label: 'Monterrey' }, // Monterrey
        { id: 'marker3', coords: [-33.45694, -70.64827], sound: 'sounds/sound2.mp3', label: 'Santiago' } // Santiago
    ];

    // Variable para almacenar el sonido actualmente en reproducción
    let currentSound = null;

    markers.forEach(marker => {
        const markerIcon = L.divIcon({ className: 'marker' });

        const leafMarker = L.marker(marker.coords, { icon: markerIcon }).addTo(map);
        
        // Agrega la etiqueta (tooltip) al marcador
        leafMarker.bindTooltip(marker.label, { permanent: false, direction: 'top', offset: [0, -10] });

        // Evento de click para reproducir el sonido
        leafMarker.on('click', () => {
            // Si ya hay un sonido en reproducción, lo detiene
            if (currentSound) {
                currentSound.pause(); // Pausa el sonido
                currentSound.currentTime = 0; // Reinicia el tiempo del sonido
            }

            // Reproduce el nuevo sonido
            currentSound = new Audio(marker.sound);
            currentSound.play();
        });
    });
});
