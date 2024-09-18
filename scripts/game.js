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
        background: "transparent",
        wireframes: true,
        showAngleIndicator: true
    }
});

// Create the game "world"
let world = engine.world;

// Objects in game world
let circleA = Bodies.circle(500 ,500 ,30);
let leftWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)-270,
    gameCanvas.clientHeight/2,
    5,
    400, 
    {isStatic:true});
let rightWall = Bodies.rectangle(
    (gameCanvas.clientWidth/2)+270,
    gameCanvas.clientHeight/2,
    5,
    400,
    {isStatic:true});
let ground = Bodies.rectangle(
    gameCanvas.clientWidth/2,
    (gameCanvas.clientHeight/2)+200,
    545,
    5
)

// Spawns pins as barriers for balls to bounce off of
let pinStack = Composites.pyramid(
    (gameCanvas.clientWidth/2)-282,
    (gameCanvas.clientHeight/2)-200,
    20,9,20,30,
    function(x,y) {
        return Bodies.circle(x, y, 5);
    }
)
// Spawns all objects in world
World.add(world,[circleA,leftWall,rightWall,ground,pinStack]);

// Runs both engine and the renderer
Runner.run(engine);
Render.run(render);

function handleResize(gameCanvas) {
    // set game canvas to new values according to change in screen size
    render.canvas.width = gameCanvas.clientWidth;
    render.canvas.height = gameCanvas.clientHeight;

    // Changes position of left wall relative to the viewport
    Matter.Body.setPosition(
        leftWall,
        Matter.Vector.create(
            (gameCanvas.clientWidth/2)-270,
            gameCanvas.clientHeight/2,
        )
    )
    // Changes position of right wall relative to the viewport
    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            (gameCanvas.clientWidth/2)+270,
            gameCanvas.clientHeight/2
        )
    )
    // Changes position of ground relative to the viewport
    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            gameCanvas.clientWidth/2,
            (gameCanvas.clientHeight/2)+200
        )
    )
}

function spawnBall() {

}

window.addEventListener("resize", () => handleResize(gameCanvas));

/**
 * TODO:
 * - Create ground that the balls can dorp into and be deleted once they hit the multiplier
 * - Create balls that can drop
 * - Create pins that the balls can bounce off of
 */