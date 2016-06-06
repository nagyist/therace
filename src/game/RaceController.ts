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

            // Bind methods
            this.changeDateTime = this.changeDateTime.bind(this);
            this.finishRace = this.finishRace.bind(this);
            this.showRaceStatus = this.showRaceStatus.bind(this);
        }

        private onPlaceBet(value:number):void
        {
            // Lock the UI to prevent clicks
            this.lockUI(true);

            // Place bet in model
            this._model.receiveBet(this._view.selectedTurtleIndex, value);

            // Start race
            this._view.startRace(this._model.winnerIndex);

            // Schedule phases
            setTimeout(this.changeDateTime, 5000, DayColors.Noon);
            setTimeout(this._view.nextPhase, 5000);
            setTimeout(this.changeDateTime, 10000, DayColors.Evening);
            setTimeout(this._view.nextPhase, 10000);
            setTimeout(this.changeDateTime, 15000, DayColors.Night);
            setTimeout(this._view.nextPhase, 15000);
            setTimeout(this.finishRace, 16000);
        }

        private finishRace():void
        {
            // Update balance
            this._betSystem.win = this._model.winAmount;

            this._view.finishRace();
            setTimeout(this.showRaceStatus, 4000);
        }

        private showRaceStatus():void
        {
            this._view.showRaceStatus(this._model.winAmount);
            this.lockUI(false);
        }

        private changeDateTime(tint:number):void
        {
            Helper.tint(this._view.children, tint);
            Helper.tint(this._betSystem.view.children, tint);
        }

        private lockUI(value:boolean):void
        {
            this._view.interactiveChildren = !value;
            this._betSystem.view.interactiveChildren = !value;
        }
    }
}