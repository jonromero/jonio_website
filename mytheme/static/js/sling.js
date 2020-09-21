var Example = Example || {};

Example.slingshot = function () {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    var width = 512;
    var height = 512;
    var divider = 8;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("sling"),

        engine: engine,
        options: {
            wireframes: false,
            background: '#ff4fff',
            width: width,
            height: height,
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var ground = Bodies.rectangle(395 / divider, 600 / divider, 815 / divider, 50 / divider, { isStatic: true }),
        rockOptions = { density: 0.004 },
        rock = Bodies.polygon(170 / divider, 450 / divider, 8 / divider, 20 / divider, rockOptions),
        anchor = { x: 170 / divider, y: 450 / divider },
        elastic = Constraint.create({
            pointA: anchor,
            bodyB: rock,
            stiffness: 0.05
        });

    var pyramid = Composites.pyramid(500 / divider, 300 / divider, 9 / divider, 10 / divider, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 25 / divider, 40 / divider);
    });

    World.add(engine.world, [ground, pyramid, rock, elastic]);

    Events.on(engine, 'afterUpdate', function () {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 / divider || rock.position.y < 430 / divider)) {
            rock = Bodies.polygon(170 / divider, 450 / divider, 7 / divider, 20 / divider, rockOptions);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
        }
    });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });

    Engine.run(engine);
    Render.run(render);
}();

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}

