let idIntervalo;

function generarSuperpoder() {
    postMessage({ accion: 'generarSuperpoder' });
}

function iniciarIntervalo() {
    idIntervalo = setInterval(generarSuperpoder, 20000); 
}

onmessage = function (e) {
    if (e.data === 'iniciar') {
        iniciarIntervalo();
    } else if (e.data === 'detener') {
        clearInterval(idIntervalo);
    }
};

