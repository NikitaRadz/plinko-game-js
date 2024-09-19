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
let pegStack = Matter.Composite.create();
createPyramid(
    pegStack, 9, 10,30, (gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150
);

// Spawns all objects in world
World.add(world,[leftWall,rightWall,ground, pegStack]);

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

function spawnBall() {}

function createPyramid(composite,rows,radius,gap,startX,startY) {
    // Loop through each row creating the circles
    for (let currentRow = 0; currentRow < rows; currentRow++) {

        let circlesInRow = rows - currentRow;

        // Calculate the x at the centre of the pyramid
        let centreX = startX - circlesInRow * (radius + gap/2);

        // Create each circle in the row
        for (let circ = 0; circ < circlesInRow; circ++) {
            let x = centreX + circ * ((radius * 2) + gap) + radius;
            let y = startY + currentRow * ((radius * 2) + gap);
            let circle = Bodies.circle(x, y, radius);

            Matter.Composite.add(composite, circle);
        }
    }
    
    // Removes top circle from pyramid so ball can spawn there
    Matter.Composite.remove(pegStack, pegStack.bodies[pegStack.bodies.length-1])

    // Makes the pyramid the right way up
    let rotationVector = Matter.Vector.create(gameCanvas.clientWidth/2,gameCanvas.clientHeight/2);
    Matter.Composite.rotate(pegStack, Math.PI, rotationVector);
}

window.addEventListener("resize", () => handleResize(gameCanvas));

/**
 * TODO:
 * - Create pins that the balls can bounce off of
 * - Create balls that can drop
 * - Create ground that the balls can dorp into and be deleted once they hit the multiplier
 */