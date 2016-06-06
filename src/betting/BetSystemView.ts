/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import Graphics = PIXI.Graphics;
    import Text = PIXI.Text;
    export class BetSystemView extends Container implements IObserver
    {
        private _balanceText:Text;

        public constructor()
        {
            super();

            this.init();
        }

        private init():void
        {
            // Status bar background
            var statusBg:Graphics = new Graphics();
            statusBg
                .beginFill(0x0, .7)
                .drawRect(0, 0, Launcher.GAME_WIDTH, 40)
                .endFill();

            statusBg.position.set(0, Launcher.GAME_HEIGHT - statusBg.height);
            this.addChild(statusBg);

            // Balance text
            this._balanceText = new Text(
                "Balance: " + Helper.formatMoney(0),
                {font : '20px Arial', fill : 0xEEEEEE, align : 'left'}
            );
            this._balanceText.position.set(10, (statusBg.height - this._balanceText.height) * .5 + statusBg.y);
            this.addChild(this._balanceText);
        }

        public update(observable:IObservable):void
        {

        }

        public update_balance(model:BetSystemModel):void
        {
            this._balanceText.text = "Balance: " + Helper.formatMoney(model.balance);
        }
    }
}