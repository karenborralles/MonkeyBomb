import EscenaBoot from './escenas/EscenaCarga.js';
import EscenaMenu from './escenas/EscenaMenu.js';
import EscenaJuego from './escenas/EscenaJuego.js';
import EscenaGameOver from './escenas/EscenaGameOver.js';

const configuracion = {
    type: Phaser.AUTO,
    width: window.innerWidth,  
    height: window.innerHeight, 
    backgroundColor: '#3498db',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [EscenaBoot, EscenaMenu, EscenaJuego, EscenaGameOver]  
};

const juego = new Phaser.Game(configuracion);

window.addEventListener('resize', () => {
    juego.scale.resize(window.innerWidth, window.innerHeight);
});
