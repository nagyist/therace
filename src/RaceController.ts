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

        public constructor(stage:Container, renderer:CanvasRenderer|WebGLRenderer)
        {
            // Init view and add to stage
            this._view = new RaceView(renderer);
            stage.addChild(this._view);

            // Init model
            this._model = new RaceModel();
            this._model.attachObserver(this._view, true);
        }
    }
}