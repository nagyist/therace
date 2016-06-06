/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import CanvasRenderer = PIXI.CanvasRenderer;
    import WebGLRenderer = PIXI.WebGLRenderer;
    export class RaceController
    {
        private _view:RaceView;
        private _model:RaceModel;
        private _betSystem:BetSystem;

        public constructor(stage:Container, renderer:CanvasRenderer|WebGLRenderer)
        {
            // Init view and add to stage
            this._view = new RaceView(renderer);
            stage.addChild(this._view);

            // Init model
            this._model = new RaceModel();

            // Set view as model's observer
            this._model.attachObserver(this._view, true);

            // Create and add bet system to display list
            this._betSystem = new BetSystem();
            this._betSystem.view.on("placeBet", this.onPlaceBet.bind(this));
            this._view.addChild(this._betSystem.view);
        }

        private onPlaceBet(value:number):void
        {
            this.lockUI(true);

            // Place bet in model
            this._model.receiveBet(this._view.selectedTurtleIndex, value);

            // Start race
            this._view.startRace(this._model.winnerIndex);
        }

        private lockUI(value:boolean):void
        {
            this._view.interactiveChildren = !value;
            this._betSystem.view.interactiveChildren = !value;
        }
    }
}