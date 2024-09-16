const engine = Matter.Engine.create();
const render = Matter.Render.create({
    engine:engine,
    canvas: document.querySelector('#gameCanvas')
});

// Elements in game
let ground = Matter.Bodies.rectangle(400,600,1000,100, {isStatic:true});
let ballA = Matter.Bodies.circle(400,200,30);
let ballB = Matter.Bodies.circle(500,200,30);

// Runs the actual game
Matter.World.add(engine.world,[ballA,ballB,ground]);
Matter.Engine.run(engine); // Use instead of Engine.run I guess?
Matter.Render.run(render);


