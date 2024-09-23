class EscenaGameOver extends Phaser.Scene {
    constructor() {
        super('EscenaGameOver');
    }

    preload() {
        this.load.image('fondoOscuro', 'assets/images/backgroundgameover.jpg');
    }

    create() {
        this.add.image(0, 0, 'fondoOscuro').setOrigin(0).setDisplaySize(window.innerWidth, window.innerHeight);
        
        const textoGameOver = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 100, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: '#ff0000',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: textoGameOver,
            alpha: { from: 1, to: 0.5 },
            duration: 1000,  
            yoyo: true,
            repeat: -1,
        });

        const botonReintentar = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, 'Reintentar', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#ff0000',
            padding: { x: 20, y: 10 },
            fontFamily: 'Courier',
        }).setOrigin(0.5);

        botonReintentar.setInteractive();
        botonReintentar.on('pointerover', () => {
            botonReintentar.setStyle({ fill: '#ffeb3b' });
        });
        botonReintentar.on('pointerout', () => {
            botonReintentar.setStyle({ fill: '#ffffff' });
        });

        botonReintentar.on('pointerdown', () => {
            this.scene.start('EscenaJuego');
        });

        const botonMenu = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 180, 'Menú Principal', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#145a32',
            padding: { x: 20, y: 10 },
            fontFamily: 'Courier',
        }).setOrigin(0.5);

        botonMenu.setInteractive();
        botonMenu.on('pointerover', () => {
            botonMenu.setStyle({ fill: '#ffeb3b' });
        });
        botonMenu.on('pointerout', () => {
            botonMenu.setStyle({ fill: '#ffffff' });
        });

        botonMenu.on('pointerdown', () => {
            this.scene.start('EscenaMenu');  
        });
    }
}

export default EscenaGameOver;