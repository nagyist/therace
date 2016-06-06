/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    import Sprite = PIXI.Sprite;
    import MovieClip = PIXI.extras.MovieClip;
    import Container = PIXI.Container;
    import Texture = PIXI.Texture;
    import Rectangle = PIXI.Rectangle;
    export class Turtle extends Container
    {
        private TEXTURE_ID_TEMPLATE:string = "assets/images/turtles/turtle$.png";

        private _idle:MovieClip;
        private _move:MovieClip;
        private _sleep:Sprite;

        private _selected:boolean;

        private _speed:number = 1;

        public constructor(private _index:number)
        {
            super();

            this.init();
        }

        private init():void
        {
            // Make interactive
            this.interactive = true;
            this.buttonMode = true;

            // Create different animations for turtle
            this._idle = this.createMovieClip(0, 10);
            this._move = this.createMovieClip(11, 17);

            // Set speed
            this._idle.animationSpeed = 0.15;
            this._move.animationSpeed = 0.02;

            // Set pivots to center
            this._idle.anchor.set(0.5, 0.5);
            this._move.anchor.set(0.5, 0.5);

            // Flip the graphics
            this._idle.scale.x = -1;
            this._move.scale.x = -1;

            // Add default state animation to display list
            this._idle.gotoAndPlay(Math.random() * 10);
            this.addChild(this._idle);

            // Tint inactive
            this._idle.tint = 0x00666666;
        }

        private createMovieClip(startFrame:number, endFrame:number):MovieClip
        {
            // Get texture id. Textures don't use 0 based enumeration, hence +1
            var textureId:string = this.TEXTURE_ID_TEMPLATE.replace('$', (this._index + 1).toString());

            var i:number,
                tex:Texture,
                frames:Array<Texture> = [],
                rect:Rectangle = new Rectangle(0,0,96,66);

            // Create frames for the MovieClip
            for(i = startFrame; i <= endFrame; i++)
            {
                // Get texture from the texture cache - I know cloning is NOT the way to go here, but it was a quick solution
                tex = PIXI.utils.TextureCache[textureId].clone();

                // Only 10 sprites on a row
                rect.x = 96 * (i % 10);
                rect.y = 66 * Math.floor(i / 10);

                // Mask the texture
                tex.frame = rect;
                frames.push(tex);
            }

            // Create and return MovieClip
            return new MovieClip(frames);
        }

        public stopMovement(isWinner:boolean):void
        {
            this._move.stop();
            this.removeChild(this._move);

            if(isWinner)
            {
                this.addChild(this._idle);
                this._idle.gotoAndPlay(Math.random() * 10);
            }
            else
            {
                var tex:Texture = PIXI.utils.TextureCache[this.TEXTURE_ID_TEMPLATE.replace('$', (this._index + 1).toString())];
                tex.frame = new Rectangle(96 * 8, 66, 96, 66);

                // Create sleep sprite
                this._sleep = new Sprite(tex);

                // Set anchor
                this._sleep.anchor.set(0.5, 0.5);

                // Flip the graphics
                this._sleep.scale.x = -1;

                // Add to display list
                this.addChild(this._sleep);
                Helper.tint(this.children, 0x005953D1);
            }
        }

        public updateMovement(isWinning:boolean):void
        {
            if(this._idle.parent)
            {
                this._idle.stop();
                this.removeChild(this._idle);

                this.addChild(this._move);
            }

            this._move.animationSpeed = isWinning ? 0.04 : 0.02;
            this._speed = isWinning ? 5 : 3;
            this._move.gotoAndPlay(Math.random() * 7);
        }

        public get speed():number { return this._speed; }
        public get index():number { return this._index; }

        public get selected():boolean { return this._selected; }
        public set selected(value:boolean)
        {
            this._selected = value;
            this._idle.tint = value ? 0xFFFFFFFF : 0x00666666;
        }
    }
}