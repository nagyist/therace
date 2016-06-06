/**
 * Created by gio on 6/6/16.
 */
namespace com.gionadirashvili.therace
{
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    export class Button extends Sprite
    {
        public constructor(texture:Texture = null)
        {
            super(texture);

            this.interactive = true;
            // Mouse over and mouse up should behave the same, hence same event listeners
            this.on("mouseover", this.onMouseOver.bind(this));
            this.on("mouseup", this.onMouseOver.bind(this));
            this.on("mouseout", this.onMouseOut.bind(this));
            this.on("mousedown", this.onMouseDown.bind(this));

            // Inactive tint
            this.tint = 0x00CCCCCC;
        }

        private onMouseOver(e:MouseEvent):void
        {
            this.tint = 0xFFFFFFFF;
        }

        private onMouseOut(e:MouseEvent):void
        {
            this.tint = 0x00CCCCCC;
        }

        private onMouseDown(e:MouseEvent):void
        {
            this.tint = 0x00666666;
        }
    }
}