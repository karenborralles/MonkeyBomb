class EscenaCarga extends Phaser.Scene {
    constructor() {
        super('EscenaCarga');
    }

    preload() {
        this.load.image('fondo', 'assets/images/background.webp');  
        this.load.image('jugador2', 'assets/sprites/player2.png');  
        this.load.image('jugador1', 'assets/sprites/player1.png');   
        this.load.image('bomba', 'assets/sprites/bomb.png');         
        this.load.image('arma', 'assets/sprites/weapon.png');        
        this.load.image('superpoder', 'assets/sprites/powerUp.png'); 
        this.load.image('destructible1', 'assets/sprites/destructible1.png');  // objeto destructible (piedra)
        this.load.image('destructible2', 'assets/sprites/destructible2.png');  // objeto destructible (madera)
    }

    create() {
        this.scene.start('EscenaMenu');
    }
}

export default EscenaCarga;


