class EscenaMenu extends Phaser.Scene {
    constructor() {
        super('EscenaMenu');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0).setDisplaySize(window.innerWidth, window.innerHeight);

        const textoTitulo = this.add.text(window.innerWidth / 2, window.innerHeight / 3, '¡Bienvenido a MONKEYBOMB:D!', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#c0392b ',  
            fontStyle: 'bold',
        }).setOrigin(0.48);

        this.tweens.add({
            targets: textoTitulo,
            alpha: { from: 1, to: 0.5 },
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        const botonInicio = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'Jugar', {
            fontSize: '48px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#28a745', 
            padding: { x: 20, y: 10 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        botonInicio.on('pointerover', () => {
            botonInicio.setStyle({ backgroundColor: '#218838', color: '#d4edda' });
        });
        botonInicio.on('pointerout', () => {
            botonInicio.setStyle({ backgroundColor: '#28a745', color: '#ffffff' });
        });

        botonInicio.on('pointerdown', () => {
            this.scene.start('EscenaJuego');
        });
    }
}

export default EscenaMenu;
