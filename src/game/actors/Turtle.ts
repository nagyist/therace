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

        public constructor(private _index:number)
        {
            super();

            this.init();
        }

        private init():void
        {
            // Create different animations for turtle
            this._idle = this.createMovieClip(0, 10);
            this._move = this.createMovieClip(11, 18);

            // Set speed
            this._idle.animationSpeed = 0.15;
            this._move.animationSpeed = 0.15;

            // Set pivots to center
            this._idle.anchor.set(0.5, 0.5);
            this._move.anchor.set(0.5, 0.5);

            // Flip the graphics
            this._idle.scale.x = -1;
            this._move.scale.x = -1;

            // Add default state animation to display list
            this._idle.gotoAndPlay(Math.random() * 10);
            this.addChild(this._idle);
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
                // Get texture from the texture cache
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
    }
}