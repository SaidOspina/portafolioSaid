const express = require('express');
const path = require('path');
const app = express();

// Puerto dinámico para Railway
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Middleware para CORS (si necesitas hacer requests desde otros dominios)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para el CV (opcional - para forzar descarga)
app.get('/cv', (req, res) => {
    const file = path.join(__dirname, 'documents', 'CV-Deisler-Said.pdf');
    res.download(file, 'CV-Deisler-Said.pdf', (err) => {
        if (err) {
            console.log('Error descargando CV:', err);
            res.status(404).send('CV no encontrado');
        }
    });
});

// Manejo de rutas no encontradas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🌐 Portafolio disponible en: http://localhost:${PORT}`);
});

// Manejo de errores
process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
    process.exit(1);
});