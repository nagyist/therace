/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import CanvasRenderer = PIXI.CanvasRenderer;
    import WebGLRenderer = PIXI.WebGLRenderer;
    import Sprite = PIXI.Sprite;
    export class RaceView extends Container
    {
        private _turtles:Array<Turtle> = [];
        private _selectionArrow:Sprite;
        private _selectedTurtle:Turtle;

        private _state:Function;

        private _narator:Narator;

        private _phaseIndex:number = 0;
        private _winnerIndex:number = 0;

        private _turtleSelectSound:Howl;
        private _raceMusic:Howl;

        public constructor(private _renderer:CanvasRenderer|WebGLRenderer)
        {
            super();

            this._state = this.idleState;
            this.init();

            // Bind methods to this
            this.render = this.render.bind(this);
            this.nextPhase = this.nextPhase.bind(this);
            this.showRaceStatus = this.showRaceStatus.bind(this);
            this.onTurtleClick = this.onTurtleClick.bind(this);

            // Start rendering loop
            this.render();
        }

        private init():void
        {
            // Add background
            this.addChild(new Sprite(PIXI.utils.TextureCache["assets/images/bg.png"]));

            // Create narator
            this._narator = new Narator([
                new NaratorSlide("1 hour later...", 2000),
                new NaratorSlide("5 hours later...", 2000),
                new NaratorSlide("Eventually...", 2000)
            ], Launcher.GAME_WIDTH, Launcher.GAME_HEIGHT);

            // Add selection arrow
            this._selectionArrow = new Sprite(PIXI.utils.TextureCache["assets/images/selectionArrow.png"]);
            this.addChild(this._selectionArrow);

            // Init sounds
            this._turtleSelectSound = new Howl({
                urls: ["assets/sounds/turtle_select.mp3", "assets/sounds/turtle_select.ogg"]
            });
            this._turtleSelectSound.load();
            this._raceMusic = new Howl({
                urls: ["assets/sounds/race_music.mp3", "assets/sounds/race_music.ogg"],
                loop: true
            });
            this._raceMusic.load();
        }

        private reset():void
        {
            //TODO clear state
        }

        private newGame(turtleCount:number):void
        {
            // Clear old state before starting new game
            this.reset();

            if(turtleCount == 0)
                return;

            // Add turtles to the scene
            var turtle:Turtle;
            for(var i:number = 0; i < turtleCount; i++)
            {
                turtle = new Turtle(i);
                turtle.position.set(40, i * 60 + 120);

                turtle.on("click", this.onTurtleClick);

                this._turtles.push(turtle);
                this.addChild(turtle);
            }

            this.selectTurtle(this._turtles[0]);
        }

        private onTurtleClick(e:any):void
        {
            this.selectTurtle(e.target as Turtle);
            this._turtleSelectSound.play();
        }

        public update(observable:IObservable):void
        {
            // Cast observable to RaceModel class for code hinting and since we know no other observable will come in here
            var model:RaceModel = observable as RaceModel;

            if(this._turtles.length != model.turtleCount)
                this.newGame(model.turtleCount);
        }

        public startRace(winnerIndex:number):void
        {
            // Change state
            this._state = this.raceState;

            // Store winner index
            this._winnerIndex = winnerIndex;

            // Hide selection arrow
            this._selectionArrow.visible = false;

            var turtle:Turtle;
            for(var i:number = 0, l:number = this._turtles.length; i < l; i++)
            {
                turtle = this._turtles[i];

                // Deselect all turtles/clear all tints
                turtle.selected = false;

                // Update turtles to use move animation
                turtle.updateMovement(Math.random() * 10 < 5);
            }

            this._raceMusic.play();
        }

        public nextPhase():void
        {
            // Show narator slide
            this.addChild(this._narator);
            this._narator.nextSlide();

            // Increase phase index
            this._phaseIndex++;

            // Move turtles according to their state and whether or not did they win
            var moveAmount:number = 400 / this._narator.slideCount;
            for(var i:number = 0, l:number = this._turtles.length; i < l; i++)
            {
                if(this._phaseIndex == this._narator.slideCount)
                {
                    if(this._winnerIndex == i)
                        this._turtles[i].x = 720;
                    else
                        this._turtles[i].x = 710 - Math.random() * 35 - 30;
                }
                else
                {
                    this._turtles[i].position.x += moveAmount + Math.random() * 40 - 20;
                }
            }
        }

        public finishRace():void
        {
            this._state = null;

            for(var i:number = 0, l:number = this._turtles.length; i < l; i++)
                this._turtles[i].stopMovement(this._winnerIndex == i);
        }

        public showRaceStatus(winAmount:number):void
        {
            var message:string = winAmount > 0 ?
                "Congratulations! You have won " + Helper.formatMoney(winAmount) + "!" :
                "Sorry, you've lost!";

            // Show message
            this._narator.showSlide(
                new NaratorSlide(
                    "Race Finished!\n" + message + "\n Please refresh the page to replay. State reset not implemented..",
                    -1)
            );

            // Stop race music
            //this._raceMusic.stop();

            // Reset state
            this.reset();
        }

        private selectTurtle(turtle:Turtle):void
        {
            // Deselect all
            for(var i:number = 0, l:number = this._turtles.length; i < l; i++)
                this._turtles[i].selected = false;

            // Select clicked turtle
            turtle.selected = true;
            this._selectedTurtle = turtle;

            // Move selection arrow to selected turtle
            this.addChild(this._selectionArrow);
            this._selectionArrow.position.set(turtle.position.x - 20, turtle.position.y - 50);
        }

        private idleState():void
        {
            this.updateSelectionArrow();
        }

        private raceState():void
        {
            for(var i:number = 0, l = this._turtles.length; i < l; i++)
                this.updateTurtle(this._turtles[i]);
        }

        private updateTurtle(turtle:Turtle):void
        {
            // Update x position
            turtle.position.x += turtle.speed * PIXI.ticker.shared.deltaTime * 0.01;
        }

        private updateSelectionArrow():void
        {
            if(this._selectedTurtle)
                this._selectionArrow.position.y = this._selectedTurtle.position.y - 50 + Math.sin(PIXI.ticker.shared.lastTime * 0.01) * 2;
        }

        private render():void
        {
            requestAnimationFrame(this.render);

            if(this._state)
                this._state();

            this._renderer.render(this);
        }

        public get selectedTurtleIndex():number { return this._selectedTurtle.index; }
    }
}