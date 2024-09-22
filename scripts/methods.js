function handleResize(gameCanvas) {
    // set game canvas to new values according to change in screen size
    render.canvas.width = gameCanvas.clientWidth;
    render.canvas.height = gameCanvas.clientHeight;

    Matter.Body.setPosition(
        leftWall,
        Matter.Vector.create(
            (gameCanvas.clientWidth/2)-270,
            gameCanvas.clientHeight/2,
        )
    );
    Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
            (gameCanvas.clientWidth/2)+270,
            gameCanvas.clientHeight/2
        )
    );
    Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
            gameCanvas.clientWidth/2,
            (gameCanvas.clientHeight/2)+200
        )
    );

    let newPyramidVector = Matter.Vector.create((gameCanvas.clientWidth/2)+15, (gameCanvas.clientHeight/2)-150);
    let pyramidVectorDelta = Matter.Vector.sub(newPyramidVector, oldPyramidVector);
    oldPyramidVector = newPyramidVector;
    Matter.Composite.translate(pegPyramid, pyramidVectorDelta);

    let newMultiVector = Matter.Vector.create((gameCanvas.clientWidth/2)-210, (gameCanvas.clientHeight/2)+180);
    let multiVectorDelta = Matter.Vector.sub(newMultiVector,oldMultiVector);
    oldMultiVector = newMultiVector;
    Matter.Composite.translate(multiplierComp, multiVectorDelta);
}

function spawnBall() {
    let ballValue = betInput.value*1;
    if (ballValue >= 1 && ballValue <= totalMoney.innerHTML.substring(1)) {
        let offSet = Math.random()*2 - 1;
        let newBall = Bodies.circle(
            (gameCanvas.clientWidth/2)+offSet,25+offSet,8,{
                restitution:0.2,
                collisionFilter: {
                    group: ballCollisionGroup,
                    category: 0x0001,
                    mask: 0x0001
                }
            }
        );
        World.add(world, newBall);

        let newTotal = totalMoney.innerHTML.substring(1) - ballValue;
        totalMoney.innerHTML = '$' + newTotal;
    }
}

function createPyramid(composite,rows,radius,gap,startX,startY) {
    // Loop through each row creating the circles
    for (let currentRow = 0; currentRow < rows; currentRow++) {

        let circlesInRow = rows - currentRow;

        // Calculate the x at the centre of the pyramid
        let centreX = startX - circlesInRow * (radius + gap/2);

        // Create each circle in the row
        for (let circ = 0; circ < circlesInRow; circ++) {
            let x = centreX + circ * ((radius * 2) + gap) + radius;
            let y = startY + currentRow * ((radius * 2) + gap-2);
            let circle = Bodies.circle(x, y, radius, {isStatic:true});
            Matter.Composite.add(composite, circle);
        }
    }
    
    // Removes top circle from pyramid so ball can spawn there
    for (let layer = 1; layer < 4; layer++) {
        Matter.Composite.remove(pegPyramid, pegPyramid.bodies[pegPyramid.bodies.length-1]);
    }
    
    // Makes the pyramid the right way up
    let rotationVector = Matter.Vector.create(gameCanvas.clientWidth/2,gameCanvas.clientHeight/2);
    Matter.Composite.rotate(pegPyramid, Math.PI, rotationVector);
}