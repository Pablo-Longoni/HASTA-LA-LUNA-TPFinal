// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Story2 extends Phaser.Scene {
  constructor() {
    super("story2");
    this.direction = "right";
    let prevY; 
  }

  init() {
    this.isGameOver = false;
    
  }

  preload() {
    // cargar los recursos
    this.load.spritesheet("pj", "./public/images/PJ.png", { frameWidth: 64, frameHeight: 64});
    this.load.spritesheet("muerte", "./public/images/muerte.png", { frameWidth: 55, frameHeight: 64});
  }

  create() {
    const map = this.make.tilemap({ key: "mapa2.1" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const capaFondo = map.addTilesetImage("fondo", "fondo");
    const capaPlataformas = map.addTilesetImage("tile", "tile");
   
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer("plataformas", capaPlataformas, 0, 0);
    const objectosLayer = map.getObjectLayer("objetos");

    
    plataformaLayer.setCollisionByProperty({ colision: true });
    
  
    console.log("spawn point player", objectosLayer);

    // crear el jugador
    // Find in the Object Layer, the name "jugador" and get position
    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);

    // The player and its settings
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "pj");

    //  Player physics properties. Give the little guy a slight bounce.
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "nube").setScale(0.1);

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "trampolin");
    console.log("spawn point trampolin ", spawnPoint);
    this.trampolin = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "trampolin");

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "obstaculo");
    console.log("spawn point obstaculo ", spawnPoint);
    

     // Create empty group of starts
     this.obstaculo = this.physics.add.group();
     // find object layer
     // if type is "stars", add to stars group
     objectosLayer.objects.forEach((objData) => {
       //console.log(objData.name, objData.type, objData.x, objData.y);
       const { x = 0, y = 0, name } = objData;
       switch (name) {
         case "obstaculo": {
           // add star to scene
           // console.log("estrella agregada: ", x, y);
           const obstaculo = this.obstaculo.create(x, y, "obstaculo");
           break;
         }
       }
     });

   
    this.cursors = this.input.keyboard.createCursorKeys();

    //agregado de fisicas      
    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      plataformaLayer,
      this.eliminarPlataforma,
      null,
      this
    );

    this.physics.add.collider(this.trampolin, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      this.trampolin,
      this.trampolinSalto,
      null,
      this
    );

    this.physics.add.collider(this.obstaculo, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      this.obstaculo,
      this.muerte,
      null,
      this
    );

    

    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.overlap(
      this.jugador,
      this.salida,
      this.esVencedor,
      null,
      this
    );

    

    //agregar camara sigue pj
    this.cameras.main.startFollow(this.jugador);

    //world bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //camara no sale del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //animaciónes del pj 
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("pj", { start:4, end: 4}),
      frameRate: 10, 
      repeat: 1,
    });
  
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("pj", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "jump1",
      frames: this.anims.generateFrameNumbers("pj", { start: 2, end: 2 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "jump2",
      frames: this.anims.generateFrameNumbers("pj", { start: 7, end: 7 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "fall1",
      frames: this.anims.generateFrameNumbers("pj", { start: 1, end: 1 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "fall2",
      frames: this.anims.generateFrameNumbers("pj", { start: 8, end: 8 }),
      frameRate: 10,
      repeat: 1,
    });

    this.anims.create({
      key: "muerte",
      frames: this.anims.generateFrameNumbers("muerte", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0,
    });

  }

  update() {
   
    if (this.cursors.left.isDown) {
      this.direction = "left"; // Actualizar la dirección del personaje
      this.jugador.anims.play("left", true);
      this.jugador.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.direction = "right"; // Actualizar la dirección del personaje
      this.jugador.anims.play("right", true);
      this.jugador.setVelocityX(200);
    } else {
      this.jugador.setVelocityX(0);
    }

    if (this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-250);
    }

    // Rastrear la posición anterior del jugador en cada actualización del juego
  if (this.prevY === undefined) {
    this.prevY = this.jugador.y;
  }

  //comprobar si el jugador está cayendo
  if (this.jugador.y > this.prevY) {
    if (this.direction === "left") {
      this.jugador.anims.play("fall1", true); 
    } else {
      this.jugador.anims.play("fall2", true); 
    }
  }
  //comprobar si el jugador está subiendo
  if (this.jugador.y < this.prevY) {
    if (this.direction === "left") {
      this.jugador.anims.play("jump1", true); 
    } else {
      this.jugador.anims.play("jump2", true); 
    }
  }

  // Actualizar la posición anterior con la posición actual 
  this.prevY = this.jugador.y;

  }

    trampolinSalto(jugador, trampolin){
      this.jugador.setVelocityY(-400);
    }
  
    muerte(jugador, obstaculo){
      this.scene.start("gameOverStory")
   
    }
  
    esVencedor(jugador, salida) {
      this.scene.start("winner");
    }

  }
  

