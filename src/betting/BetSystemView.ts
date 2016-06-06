/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    import Container = PIXI.Container;
    import Graphics = PIXI.Graphics;
    import Text = PIXI.Text;
    import Sprite = PIXI.Sprite;
    export class BetSystemView extends Container implements IObserver
    {
        private CHIP_VALUES:Array<number> = [ 10, 50, 100 ];

        private _balanceText:Text;
        private _chipSelectors:Array<Chip> = [];
        private _selectedChip:Chip;

        private _placeBetBg:Sprite;
        private _placedChips:Array<Sprite> = [];

        public constructor()
        {
            super();

            this.onChipClick = this.onChipClick.bind(this);
            this.onPlaceChip = this.onPlaceChip.bind(this);

            this.init();
        }

        private init():void
        {
            // Bet system background
            var betSystemBg:Sprite = new Sprite(PIXI.utils.TextureCache["assets/images/betSystemBg.png"]);
            betSystemBg.anchor.set(.5, 1);
            betSystemBg.position.set(Launcher.GAME_WIDTH * .5, Launcher.GAME_HEIGHT - 60);
            this.addChild(betSystemBg);

            // Place bet background
            this._placeBetBg = new Sprite(PIXI.utils.TextureCache["assets/images/placeBetBg.png"]);
            this._placeBetBg.anchor.set(.5, .5);
            this._placeBetBg.position.set(betSystemBg.x, betSystemBg.y - betSystemBg.height + this._placeBetBg.height * .5 + 10);
            this._placeBetBg.interactive = true;
            this._placeBetBg.on("click", this.onPlaceChip);
            this.addChild(this._placeBetBg);

            // Add chip selectors
            let MARGIN:number = 5,
                CHIP_COUNT:number = this.CHIP_VALUES.length;
            var chip:Chip,
                startX:number = (Launcher.GAME_WIDTH - CHIP_COUNT * (Chip.CHIP_WIDTH + MARGIN)) * .5;
            for(var i:number = 0; i < CHIP_COUNT; i++)
            {
                // Create chip selector
                chip = new Chip(this.CHIP_VALUES[i], i);

                // Set position
                chip.position.set(startX + i * (Chip.CHIP_WIDTH + MARGIN), betSystemBg.position.y - chip.height - 8);

                // Add listener
                chip.on("click", this.onChipClick);

                // Save to list and add to display list
                this._chipSelectors.push(chip);
                this.addChild(chip);
            }
            // Select default chip
            this.selectChip(this._chipSelectors[0]);

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

        private selectChip(chip:Chip):void
        {
            for(var i:number = 0, l = this._chipSelectors.length; i < l; i++)
                this._chipSelectors[i].selected = false;

            chip.selected = true;
            this._selectedChip = chip;
        }

        private onPlaceChip(e:any):void
        {
            this.emit("addBet", this._selectedChip.value);
        }

        private onChipClick(e:any):void
        {
            this.selectChip(e.target as Chip);
        }

        public update(observable:IObservable):void
        {

        }

        public update_balance(model:BetSystemModel):void
        {
            this._balanceText.text = "Balance: " + Helper.formatMoney(model.balance);
        }

        public update_bet(model:BetSystemModel):void
        {
            // Clear old chips
            while(this._placedChips.length > 0)
                this.removeChild(this._placedChips.pop());

            var chipIndex:number = this.CHIP_VALUES.length - 1,
                amount:number = 0;
            while(amount < model.bet)
            {
                if(amount + this.CHIP_VALUES[chipIndex] <= model.bet)
                {
                    // Increase the amount
                    amount += this.CHIP_VALUES[chipIndex];

                    // Create side view chip to add
                    var chip:Sprite = new Sprite(PIXI.utils.TextureCache["chips_side_0" + (chipIndex + 1) + ".png"]);

                    // Set scale, position and anchor
                    chip.width = Chip.CHIP_WIDTH;
                    chip.scale.y = chip.scale.x;
                    chip.anchor.set(0.5, 0);
                    chip.position.set(Launcher.GAME_WIDTH * .5, this._placeBetBg.y - this._placedChips.length * chip.height * .2);

                    // Push to _placedChips list
                    this._placedChips.push(chip);

                    // Add to display list
                    this.addChild(chip);
                }
                else
                {
                    chipIndex--;

                    if(chipIndex < 0)
                    {
                        console.warn("Can't display bet visually using existing chips:", model.bet);
                        break;
                    }
                }
            }
        }
    }
}