// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Precarga extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("precarga");
  }

  preload() {
    // load assets

    
    this.load.tilemapTiledJSON("mapa2","./public/tilemap/mapa2.json");
    this.load.tilemapTiledJSON("mapa3","./public/tilemap/mapa3.json");
    this.load.tilemapTiledJSON("mapa5","./public/tilemap/mapa5.json");
    this.load.tilemapTiledJSON("mapa6","./public/tilemap/mapa6.json");
    this.load.tilemapTiledJSON("mapa2.1","./public/tilemap/mapa2.1.json");
    
    this.load.image("tile", "./public/images/tile.png");
    this.load.image("fondo", "./public/images/fondo.png");
    this.load.image("nube", "./public/images/nube.png");

    this.load.spritesheet("pj", "./public/images/pj.png", { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet("pj-a", "./public/images/PJ-A.png", { frameWidth: 64, frameHeight: 64});

    this.load.image("menu", "./public/images/menu.png");
    this.load.image("obstaculo","./public/images/obstaculo.png");
    this.load.image("trampolin","./public/images/trampolin.png");
    
    this.load.image("jugar","./public/images/jugar.png");
    this.load.image("menu-boton","./public/images/boton-menu.png");
    this.load.image("reiniciar","./public/images/boton-reiniciar.png");
    this.load.image("saltar","./public/images/flecha.png");
    this.load.image("reiniciar","./public/images/boton-reiniciar.png");
    this.load.image("gameOver","./public/images/gameOver.png");
    this.load.image("gameOver2", "./public/images/gameOver2.png");
    this.load.image("historia", "./public/images/historia.png");  
    
    
    this.load.image("story1", "./public/images/story1.png"); 
    this.load.image("story2", "./public/images/story2.png"); 
    this.load.image("story3", "./public/images/story3.png");  

    //this.load.audio("music", "./public/music/music.wav");
    this.load.audio("trampolin", ".public/music/trampolin.mp3");
  }

  create() {
    // create game objects

    this.music = this.sound.add("music", { loop: true});
    this.music.play();
  }

  update() {
    // update game objects
  }
  init() {
    //init scene menu
    this.scene.start("menu");
  }
}



