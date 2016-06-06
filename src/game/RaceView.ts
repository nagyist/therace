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

        public constructor(private _renderer:CanvasRenderer|WebGLRenderer)
        {
            super();

            this.init();

            // Bind render method to this
            this.render = this.render.bind(this);
            // Start rendering loop
            this.render();
        }

        private init():void
        {
            this.addChild(new Sprite(PIXI.utils.TextureCache["assets/images/bg.png"]));
        }

        private clearState():void
        {
            //TODO clear state
        }

        private newGame(turtleCount:number):void
        {
            // Clear old state before starting new game
            this.clearState();

            // Add turtles to the scene
            var turtle:Turtle;
            for(var i:number = 0; i < turtleCount; i++)
            {
                turtle = new Turtle(i);
                turtle.position.set(40, i * 60 + 120);

                this._turtles.push(turtle);
                this.addChild(turtle);
            }
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
        
        private updateTurtle(turtle:Turtle):void
        {
            //TODO update turtle visuals
        }

        private render():void
        {
            requestAnimationFrame(this.render);

            for(var i:number = 0, l = this._turtles.length; i < l; i++)
                this.updateTurtle(this._turtles[i])

            if(this._isDirty)
                this._renderer.render(this);
        }
    }
}