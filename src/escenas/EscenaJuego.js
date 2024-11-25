class EscenaJuego extends Phaser.Scene { 
    constructor() {
        super('EscenaJuego');
        this.workerBombas = []; 
        this.workerSuperpoder = null;  
        this.superpoderesActivos = 0;    
    }

    create() {
        const fondo = this.add.image(0, 0, 'fondo').setOrigin(0).setDisplaySize(window.innerWidth, window.innerHeight);

        this.jugador2 = this.physics.add.sprite(285, 530, 'jugador2').setScale(0.30);
        this.jugador2.setCollideWorldBounds(true); //Límites

        this.jugador1 = this.physics.add.sprite(1110, 100, 'jugador1').setScale(0.26);
        this.jugador1.setCollideWorldBounds(true);

        this.jugador1.vida = 100;
        this.jugador2.vida = 100;

        this.jugador2.barraVida = this.add.text(40, 20, 'Vida Jugador 2: 100', { fontSize: '20px', fill: '#fff'});
        this.jugador1.barraVida = this.add.text(1030, 20, 'Vida Jugador 1: 100', { fontSize: '20px', fill: '#fff' });

        this.jugador1.tieneArma = false;
        this.jugador2.tieneArma = false;
        
        this.jugador1.disparosRestantes = 0;
        this.jugador2.disparosRestantes = 0;

        this.workerSuperpoder = new Worker('src/hilos/workerSuperpoder.js');
        this.workerSuperpoder.postMessage('iniciar');

        this.workerSuperpoder.onmessage = (evento) => {
            if (evento.data.accion === 'generarSuperpoder' && this.superpoderesActivos < 3) {
                this.generarSuperpoder();
            }
        };

        this.bombas = this.physics.add.group();
        this.disparos = this.physics.add.group();
        this.destructibles = this.physics.add.group();
        this.armas = this.physics.add.group();

        //OBJETOS DESTRUCTIBLES EN EL MAPA
        this.crearDestructible(260, 140, 'destructible2', 'madera1');  // madera1        
        this.crearDestructible(260, 225, 'destructible2', 'madera2');  // madera1
        this.crearDestructible(260, 305, 'destructible2', 'madera3');  // madera1
        this.crearDestructible(260, 389, 'destructible2', 'madera4');  // maderaprimerafilaultima
        this.crearDestructible(370, 140, 'destructible2', 'madera5');  // madera2        
        this.crearDestructible(370, 225, 'destructible2', 'madera6');  // madera2
        this.crearDestructible(370, 305, 'destructible2', 'madera7');  // madera2
        this.crearDestructible(370, 389, 'destructible2', 'madera8');  // madera2
        this.crearDestructible(1010, 560, 'destructible2', 'madera9');  // madera3        
        this.crearDestructible(1010, 475, 'destructible2', 'madera10');  // madera3
        this.crearDestructible(1010, 389, 'destructible2', 'madera11');  // madera3
        this.crearDestructible(1010, 305, 'destructible2', 'madera12');  // maderaprimerafilaultima3
        this.crearDestructible(1130, 560, 'destructible2', 'madera13');  // madera4        
        this.crearDestructible(1130, 475, 'destructible2', 'madera14');  // madera4
        this.crearDestructible(1130, 389, 'destructible2', 'madera15');  // madera4
        this.crearDestructible(1130, 305, 'destructible2', 'madera16');  // madera4
        //primera linea de piedra
        this.crearDestructible(495, 560, 'destructible1');  // piedra
        this.crearDestructible(499, 475, 'destructible2', 'madera17');  // madera2
        this.crearDestructible(496, 389, 'destructible1');  // piedra
        this.crearDestructible(499, 305, 'destructible2', 'madera18');  // madera3
        this.crearDestructible(496, 225, 'destructible1');  // piedra
        this.crearDestructible(499, 140, 'destructible2', 'madera19');  // madera4

        //primera linea madera
        this.crearDestructible(600, 560, 'destructible2');  // piedra
        this.crearDestructible(600, 475, 'destructible2', 'madera20');  // madera2
        this.crearDestructible(600, 389, 'destructible2');  // piedra
        this.crearDestructible(600, 305, 'destructible2', 'madera21');  // madera3
        this.crearDestructible(600, 225, 'destructible2');  // piedra
        this.crearDestructible(600, 140, 'destructible2', 'madera22');  // madera4

        //segunda linea madera
        this.crearDestructible(800, 560, 'destructible2');  // piedra
        this.crearDestructible(800, 475, 'destructible2', 'madera23');  // madera2
        this.crearDestructible(800, 389, 'destructible2');  // piedra
        this.crearDestructible(800, 305, 'destructible2', 'madera24');  // madera3
        this.crearDestructible(800, 225, 'destructible2');  // piedra
        this.crearDestructible(800, 140, 'destructible2', 'madera25');  // madera4

        //segunda linea de piedra
        this.crearDestructible(695, 560, 'destructible1');  // piedra
        this.crearDestructible(698, 475, 'destructible2', 'madera26');  // madera2
        this.crearDestructible(695, 389, 'destructible1');  // piedra
        this.crearDestructible(698, 305, 'destructible2', 'madera27');  // madera3
        this.crearDestructible(695, 225, 'destructible1');  // piedra
        this.crearDestructible(698, 140, 'destructible2', 'madera28');  // madera4

        //tercer linea de piedra
        this.crearDestructible(895, 560, 'destructible1');  // piedra
        this.crearDestructible(898, 475, 'destructible2', 'madera29');  // madera2
        this.crearDestructible(895, 389, 'destructible1');  // piedra
        this.crearDestructible(898, 305, 'destructible2', 'madera30');  // madera3
        this.crearDestructible(895, 225, 'destructible1');  // piedra
        this.crearDestructible(898, 140, 'destructible2', 'madera31');  // madera4

        this.teclas = this.input.keyboard.createCursorKeys();
        this.teclaDisparo1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);  

        this.controlesJugador2 = this.input.keyboard.addKeys({
            arriba: Phaser.Input.Keyboard.KeyCodes.W,
            abajo: Phaser.Input.Keyboard.KeyCodes.S,
            izquierda: Phaser.Input.Keyboard.KeyCodes.A,
            derecha: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.teclaDisparo2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);  

        this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
        this.teclaEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.physics.add.collider(this.jugador1, this.destructibles); //no atravesar objetos destructibles
        this.physics.add.collider(this.jugador2, this.destructibles); 
        this.physics.add.overlap(this.jugador1, this.armas, (jugador, arma) => this.recogerArma(jugador, arma), null, this); //toquen armas
        this.physics.add.overlap(this.jugador2, this.armas, (jugador, arma) => this.recogerArma(jugador, arma), null, this);
    }

    update() {
        if (this.teclas.left.isDown) {
            this.jugador1.setVelocityX(-160);
        } else if (this.teclas.right.isDown) {
            this.jugador1.setVelocityX(160);
        } else {
            this.jugador1.setVelocityX(0);
        }

        if (this.teclas.up.isDown) {
            this.jugador1.setVelocityY(-160);
        } else if (this.teclas.down.isDown) {
            this.jugador1.setVelocityY(160);
        } else {
            this.jugador1.setVelocityY(0);
        }

        if (this.controlesJugador2.izquierda.isDown) {
            this.jugador2.setVelocityX(-160);
        } else if (this.controlesJugador2.derecha.isDown) {
            this.jugador2.setVelocityX(160);
        } else {
            this.jugador2.setVelocityX(0);
        }

        if (this.controlesJugador2.arriba.isDown) {
            this.jugador2.setVelocityY(-160);
        } else if (this.controlesJugador2.abajo.isDown) {
            this.jugador2.setVelocityY(160);
        } else {
            this.jugador2.setVelocityY(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)) {
            this.colocarBomba(this.jugador2);
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclaEnter)) {
            this.colocarBomba(this.jugador1);
        }

        if (this.jugador1.tieneArma && Phaser.Input.Keyboard.JustDown(this.teclaDisparo1)) {
            this.disparar(this.jugador1);
        }
        if (this.jugador2.tieneArma && Phaser.Input.Keyboard.JustDown(this.teclaDisparo2)) {
            this.disparar(this.jugador2);
        }

        this.jugador1.barraVida.setText('Vida Jugador 1: ' + this.jugador1.vida);
        this.jugador2.barraVida.setText('Vida Jugador 2: ' + this.jugador2.vida);
    }

    generarSuperpoder() {
        const x = Phaser.Math.Between(100, window.innerWidth - 100);
        const y = Phaser.Math.Between(100, window.innerHeight - 100);

        const superpoder = this.physics.add.sprite(x, y, 'superpoder').setScale(0.07);  
        superpoder.setCollideWorldBounds(true); //Límites

        this.superpoderesActivos++;

        this.physics.add.overlap(this.jugador1, superpoder, () => this.recogerSuperpoder(this.jugador1, superpoder), null, this); //tocan un superpoder
        this.physics.add.overlap(this.jugador2, superpoder, () => this.recogerSuperpoder(this.jugador2, superpoder), null, this);
    }

    recogerSuperpoder(jugador, superpoder) {
        superpoder.destroy();  
        this.superpoderesActivos--; 

        jugador.tieneArma = true;
        jugador.disparosRestantes += 5;  

        this.time.delayedCall(3000, () => {
            jugador.superpoderActivo = false;  
        });

        console.log(`${jugador.texture.key} ha recogido un superpoder y ahora tiene un arma!`);
    }

    recogerArma(jugador, arma) {
        arma.destroy();
        jugador.tieneArma = true;
        jugador.disparosRestantes = 3;  
        console.log(`${jugador.texture.key} recogió un arma`);
    }

    disparar(jugador) {
        if (jugador.disparosRestantes > 0) {
            const disparo = this.disparos.create(jugador.x, jugador.y, 'arma').setScale(0.09);

            if (jugador === this.jugador2) {
                disparo.body.velocity.x = 300;  
            } else if (jugador === this.jugador1) {
                disparo.body.velocity.x = -300;  
            }

            this.physics.add.overlap(disparo, this.destructibles, (disparo, destructible) => {
                if (destructible.texture.key === 'destructible2') {
                    destructible.destroy();  
                }
                disparo.destroy();  
            });

            this.physics.add.overlap(disparo, jugador === this.jugador1 ? this.jugador2 : this.jugador1, (disparo, oponente) => {
                disparo.destroy();
                oponente.vida -= 50;  
                if (oponente.vida <= 0) {
                    this.terminarJuego(oponente);  
                }
            });

            jugador.disparosRestantes--;  
        }
    }
    
    colocarBomba(jugador) {
        const bomba = this.bombas.create(jugador.x, jugador.y, 'bomba').setScale(0.17);
        bomba.body.immovable = true;
        bomba.setCollideWorldBounds(true);
        bomba.idBomba = Date.now();  
    
        const workerBomba = new Worker('src/hilos/workerBomba.js');
        workerBomba.onmessage = (evento) => {
            console.log(`Mensaje del worker recibido: ${evento.data.accion}`); 
            if (evento.data.accion === 'explota' && evento.data.idBomba === bomba.idBomba) {
                this.explotarBomba(bomba);
                workerBomba.terminate();  
            }
        };
    
        workerBomba.postMessage({ idBomba: bomba.idBomba });
    
        this.workerBombas.push(workerBomba);
    }      

    explotarBomba(bomba) {
        console.log('Bomba explotando', bomba);  
        bomba.destroy(); 
        const rangoExplosión = 2;  
    
        this.crearExplosion(bomba.x, bomba.y);  
        for (let i = 1; i <= rangoExplosión; i++) {
            this.crearExplosion(bomba.x + i * 32, bomba.y);  // Derecha
            this.crearExplosion(bomba.x - i * 32, bomba.y);  // Izquierda
            this.crearExplosion(bomba.x, bomba.y + i * 32);  // Abajo
            this.crearExplosion(bomba.x, bomba.y - i * 32);  // Arriba
        }
    }    

    crearExplosion(x, y) {
        const zonaExplosion = this.add.zone(x, y).setSize(32, 32);
        this.physics.world.enable(zonaExplosion); //Detectar alguna colisión
        zonaExplosion.body.immovable = true;

        this.physics.overlap(zonaExplosion, [this.jugador1, this.jugador2], (tile, jugador) => {
            jugador.vida -= 10;  
            if (jugador.vida <= 0) {
                this.terminarJuego(jugador);  
            }
        });

        this.physics.overlap(zonaExplosion, this.destructibles, (tile, destructible) => {
            if (destructible.texture.key === 'destructible2') {
                destructible.destroy();  
                if (Math.random() > 0.8) {  
                    this.generarArma(destructible.x, destructible.y);
                }
            }
        });
        this.time.delayedCall(200, () => zonaExplosion.destroy()); //desaparezca
    }

    generarArma(x, y) {
        const arma = this.armas.create(x, y, 'arma').setScale(0.09);
        arma.setCollideWorldBounds(true);
        arma.body.setSize(arma.width * 0.5, arma.height * 0.5);  //estar cerca para agarrar el arma
        arma.body.setOffset(arma.width * 0.25, arma.height * 0.25);   //colisión centrada
    }

    terminarJuego(jugador) {
        jugador.setTint(0xff0000);  
        jugador.setVelocity(0, 0);  
        this.time.delayedCall(1000, () => {
            this.scene.start('EscenaGameOver');  
        });
    }

    crearDestructible(x, y, clave, id) {
        const destructible = this.destructibles.create(x, y, clave).setScale(0.12);
        destructible.nombre = id;  
        destructible.body.setSize(destructible.width * 0.1, destructible.height * 0.1);
        destructible.setCollideWorldBounds(true);
        destructible.body.immovable = true;
    }    
}

export default EscenaJuego;
