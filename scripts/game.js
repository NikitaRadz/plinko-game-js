const gameCanvas = document.getElementById('gameCanvas');

// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    World = Matter.World;

// Create an engine
let engine = Engine.create();

// Create a renderer
let render = Render.create({
    element: gameCanvas,
    engine: engine,
    options: {
        width: gameCanvas.clientWidth,
        height: gameCanvas.clientHeight,
        wireframes: true,
        showAngleIndicator: false
    }
});

// Create the game "world"
let world = engine.world;
engine.gravity.y = 0.4

// Objects in game world
let leftWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)-270,
    gameCanvas.clientHeight/2,
    5,
    400, 
    {isStatic:true}
);
let rightWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)+270,
    gameCanvas.clientHeight/2,
    5,
    400,
    {isStatic:true}
);
let ground = Bodies.rectangle(
    gameCanvas.clientWidth/2,
    (gameCanvas.clientHeight/2)+200,
    545,
    5,
    {isStatic:true}
);

let multiplierComp = Matter.Composite.create();

// Creates bottom row of multipliers
for (let i = 0; i <= 10; i++) {
    let multiplierBlock = Bodies.rectangle(
        gameCanvas.clientWidth/2-210+(i*42),
        gameCanvas.clientHeight/2+180,
        30, 30,
        {
            isStatic:true,
            render: {
                sprite: {
                    texture:"./images/image.png",
                    xScale: 1,
                    yScale: 1
                }
            }
        }
    );
    Matter.Composite.add(multiplierComp,multiplierBlock);
}
let square = Bodies.rectangle(150,150,30,30, {
    isStatic:true,
    render: {
        sprite: {
            texture: "image.png"
        }
    }
});
World.add(world, square);
let ballCollisionGroup = Matter.Body.nextGroup(true);
let pegPyramid = Matter.Composite.create();

createPyramid(
    pegPyramid, 12, 6,30, (gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150
);

// Initial position of peg pyramid
let oldPyramidVector = Matter.Vector.create((gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150);
// Inital position of multipliers
let oldMultiVector = Matter.Vector.create(gameCanvas.clientWidth/2-210,gameCanvas.clientHeight/2+180);

// Spawns all objects in world
World.add(world,[leftWall,rightWall,ground, pegPyramid, multiplierComp]);

// Runs both engine and the renderer
Runner.run(engine);
Render.run(render);

window.addEventListener("resize", () => handleResize(gameCanvas));

/**
 * TODO:
 * - Create ground that the balls can dorp into and be deleted once they hit the multiplier
 */