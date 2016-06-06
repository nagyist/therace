/**
 * Created by gio on 6/6/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import Graphics = PIXI.Graphics;
    import Text = PIXI.Text;
    export class NaratorSlide
    {
        public constructor(public text:string, public showTime:number, public backgroundColor:number = 0x0)
        {

        }
    }

    export class Narator extends Container
    {
        private _bg:Graphics;
        private _txt:Text;
        private _index:number = -1;

        public constructor(private _slides:Array<NaratorSlide>, private _width:number, private _height:number)
        {
            super();

            // Bind methods
            this.hideSlide = this.hideSlide.bind(this);

            // Add background graphics and text
            this._bg = new Graphics();
            this._txt = new Text(
                "",
                {font : '24px Arial', fill : 0xEEEEEE, align : 'center'}
            );
            this._txt.anchor.set(.5, .5);
            this._txt.position.set(_width * .5, _height * .5);
        }

        public nextSlide():void
        {
            this._index++;

            if(this._index >= this._slides.length)
                return;

            var slide:NaratorSlide = this._slides[this._index];

            this._bg
                .beginFill(slide.backgroundColor)
                .drawRect(0,0,this._width,this._height)
                .endFill();

            this.addChild(this._bg);

            this._txt.text = slide.text;
            this.addChild(this._txt);

            setTimeout(this.hideSlide, slide.showTime);
        }

        private hideSlide():void
        {
            this.removeChild(this._txt);
            this.removeChild(this._bg);
        }
    }
}