/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import WebGLRenderer = PIXI.WebGLRenderer;
    import CanvasRenderer = PIXI.CanvasRenderer;
    import Graphics = PIXI.Graphics;
    export class Launcher
    {
        public static GAME_WIDTH:number = 800;
        public static GAME_HEIGHT:number = 600;

        private _renderer:WebGLRenderer|CanvasRenderer;
        private _stage:Container;

        private _progressBar:Graphics;
        private _game:RaceController;

        constructor()
        {
            // Setup stage and renderer
            this._stage = new Container();
            this._stage.interactive = true;
            this._renderer = PIXI.autoDetectRenderer(Launcher.GAME_WIDTH, Launcher.GAME_HEIGHT, {
                antialias: false,
                transparent: false,
                resolution: 1
            });
            this._renderer.backgroundColor = 0x141414;

            // Add view to HTML DOM tree
            document.body.appendChild(this._renderer.view);

            // Create progress bar
            this.initProgressBar();

            // Start loading assets
            PIXI.loader
                .add([
                    "assets/images/turtles/turtle1.png",
                    "assets/images/turtles/turtle2.png",
                    "assets/images/turtles/turtle3.png",
                    "assets/images/bg.png",
                    "assets/images/chips/chips.json"
                ])
                .load(this.onLoadComplete.bind(this))
                .on("progress", this.onLoadProgress.bind(this));
        }

        private initProgressBar():void
        {
            // Instantiate
            this._progressBar = new Graphics();

            // Initially draw empty progress bar
            this.drawProgressBar(0x333333, Launcher.GAME_WIDTH * .5);

            // Add to display list
            this._stage.addChild(this._progressBar);

            // Render the stage
            this._renderer.render(this._stage);
        }

        private drawProgressBar(color:number, width:number):void
        {
            // Draw
            this._progressBar
                .beginFill(color)
                .drawRect(
                    Launcher.GAME_WIDTH * .25,
                    Launcher.GAME_HEIGHT * .5 - 2,
                    width,
                    4
                ).endFill();
        }

        private onLoadProgress():void
        {
            // Fill the progress bar
            this.drawProgressBar(0xCCCCCC, Launcher.GAME_WIDTH * .5 * PIXI.loader.progress * 0.01);

            // Render the stage
            this._renderer.render(this._stage);
        }

        private onLoadComplete():void
        {
            console.log("onLoadComplete");

            // Dispose progress bar
            this._stage.removeChild(this._progressBar);
            this._progressBar = null;

            // Instantiate game object
            this._game = new RaceController(this._stage, this._renderer);
        }
    }
}