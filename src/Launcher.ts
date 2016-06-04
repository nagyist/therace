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
        private GAME_WIDTH:number = 800;
        private GAME_HEIGHT:number = 600;

        private _renderer:WebGLRenderer|CanvasRenderer;
        private _stage:Container;

        private _progressBar:Graphics;
        private _game:RaceController;

        constructor()
        {
            // Setup stage and renderer
            this._stage = new Container();
            this._renderer = PIXI.autoDetectRenderer(this.GAME_WIDTH, this.GAME_HEIGHT, {
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
                    "test.png"
                ])
                .load(this.onLoadComplete.bind(this))
                .on("progress", this.onLoadProgress.bind(this));
        }

        private initProgressBar():void
        {
            // Instantiate
            this._progressBar = new Graphics();

            // Initially draw empty progress bar
            this.drawProgressBar(0x333333, this.GAME_WIDTH * .5);

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
                    this.GAME_WIDTH * .25,
                    this.GAME_HEIGHT * .5 - 2,
                    width,
                    4
                ).endFill();
        }

        private onLoadProgress():void
        {
            // Fill the progress bar
            this.drawProgressBar(0xCCCCCC, this.GAME_WIDTH * .5 * PIXI.loader.progress * 0.01);

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