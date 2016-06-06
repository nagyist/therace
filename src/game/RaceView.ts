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
        // Used to optimize draw calls and manually control whether or not should the renderer redraw the stage
        private _isDirty:boolean = true;

        private _turtles:Array<Turtle> = [];
        private _selectionArrow:Sprite;
        private _selectedTurtle:Turtle;

        private state:Function;

        public constructor(private _renderer:CanvasRenderer|WebGLRenderer)
        {
            super();

            this.state = this.idleState;
            this.init();

            // Bind methods to this
            this.render = this.render.bind(this);
            this.onTurtleClick = this.onTurtleClick.bind(this);
            // Start rendering loop
            this.render();
        }

        private init():void
        {
            // Add background
            this.addChild(new Sprite(PIXI.utils.TextureCache["assets/images/bg.png"]));

            // Add selection arrow
            this._selectionArrow = new Sprite(PIXI.utils.TextureCache["assets/images/selectionArrow.png"]);
            this.addChild(this._selectionArrow);
        }

        private clearState():void
        {
            //TODO clear state
        }

        private newGame(turtleCount:number):void
        {
            // Clear old state before starting new game
            this.clearState();

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
        }

        public update(observable:IObservable):void
        {
            // Cast observable to RaceModel class for code hinting and since we know no other observable will come in here
            var model:RaceModel = observable as RaceModel;

            // Mark stage as dirty
            this._isDirty = true;

            if(this._turtles.length != model.turtleCount)
                this.newGame(model.turtleCount);
        }

        public startRace(winnerIndex:number):void
        {
            this.state = this.raceState;

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
        }

        public nextPhase():void
        {
            
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

            this.state();

            if(this._isDirty)
                this._renderer.render(this);
        }

        public get selectedTurtleIndex():number { return this._selectedTurtle.index; }
    }
}