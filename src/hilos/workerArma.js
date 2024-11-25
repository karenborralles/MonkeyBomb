self.onmessage = function(e) {
    const { idBala, inicioX, inicioY, velocidadX, velocidadY, limites, destructibles } = e.data;

    let posicionX = inicioX;
    let posicionY = inicioY;

    const intervalo = setInterval(() => {
        posicionX += velocidadX;
        posicionY += velocidadY;

        for (const destructible of destructibles) {
            if (
                posicionX > destructible.x && posicionX < destructible.x + destructible.width &&
                posicionY > destructible.y && posicionY < destructible.y + destructible.height
            ) {
                clearInterval(intervalo);
                self.postMessage({ idBala, accion: 'impacto', idDestructible: destructible.id });
                self.close();
                return;
            }
        }

        if (posicionX < limites.izquierda || posicionX > limites.derecha || posicionY < limites.arriba || posicionY > limites.abajo) { //verifica si salio de los límites
            clearInterval(intervalo);
            self.postMessage({ idBala, accion: 'destruir' });
            self.close();
        } else {
            self.postMessage({ idBala, posicionX, posicionY });
        }
    }, 50);
};