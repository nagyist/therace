/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import CanvasRenderer = PIXI.CanvasRenderer;
    import WebGLRenderer = PIXI.WebGLRenderer;
    export class RaceView extends Container
    {
        // Used to optimize draw calls and manually control whether or not should the renderer redraw the stage
        private isDirty:boolean = true;

        public constructor(private _renderer:CanvasRenderer|WebGLRenderer)
        {
            super();

            // Bind render method to this
            this.render = this.render.bind(this);
            // Start rendering loop
            this.render();
        }

        public update(observable:IObservable):void
        {
            this.isDirty = true;
        }

        private render():void
        {
            requestAnimationFrame(this.render);

            if(this.isDirty)
                this._renderer.render(this);
        }
    }
}