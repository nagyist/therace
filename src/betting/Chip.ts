/**
 * Created by gio on 6/6/16.
 */
namespace com.gionadirashvili.therace
{
    import Sprite = PIXI.Sprite;
    import Text = PIXI.Text;
    import Container = PIXI.Container;
    export class Chip extends Container
    {
        public static CHIP_WIDTH:number = 24;

        private _selected:boolean = false;
        private _bg:Sprite;

        public constructor(private _value:number, private _index:number)
        {
            super();

            // Create visuals and setup scale
            this._bg = new Sprite(PIXI.utils.TextureCache["chips_0" + (_index + 1) + ".png"]);
            this._bg.width = Chip.CHIP_WIDTH;
            this._bg.scale.y = this._bg.scale.x;
            this.addChild(this._bg);

            // Tint non-selected by default
            this._bg.tint = 0x00CCCCCC;

            // Define interactiveness
            this.interactive = true;

            // Add text display
            var txt:Text = new Text(
                this._value.toString(),
                {font : '14px Arial', fill : 0x0, align : 'center'}
            );
            txt.position.set((this._bg.width - txt.width) * .5, 5);
            this.addChild(txt);
        }

        public get index():number { return this._index; }
        public get value():number { return this._value; }

        public get selected():boolean { return this._selected; }
        public set selected(value:boolean)
        {
            this._selected = value;

            this._bg.tint = value ? 0xFFFFFFFF : 0x00CCCCCC;
        }
    }
}