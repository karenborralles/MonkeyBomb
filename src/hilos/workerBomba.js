onmessage = function (e) {
    const { idBomba } = e.data;

    setTimeout(() => {
        postMessage({ accion: 'explota', idBomba });
    }, 1500);
};
