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
        private _betText:Text;
        private _chipSelectors:Array<Chip> = [];
        private _selectedChip:Chip;

        private _placeBetBtn:Button;
        private _placeBetBg:Sprite;
        private _placedChips:Array<Sprite> = [];

        private _currentBetAmount:number = 0;

        public constructor()
        {
            super();

            this.onChipClick = this.onChipClick.bind(this);
            this.onPlaceChip = this.onPlaceChip.bind(this);
            this.onPlaceBet = this.onPlaceBet.bind(this);

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

            // Place bet button
            this._placeBetBtn = new Button(PIXI.utils.TextureCache["assets/images/placeBetBtn.png"]);
            this._placeBetBtn.anchor.set(.5, .5);
            this._placeBetBtn.position.set(this._placeBetBg.position.x + this._placeBetBtn.width + 40, this._placeBetBg.position.y);
            this._placeBetBtn.on("click", this.onPlaceBet);
            this.addChild(this._placeBetBtn);

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

            // Bet text
            this._betText = new Text(
                "Bet: " + Helper.formatMoney(0),
                {font : '20px Arial', fill : 0xEEEEEE, align : 'right'}
            );
            this._betText.anchor.set(1, 0);
            this._betText.position.set(Launcher.GAME_WIDTH - 10, (statusBg.height - this._betText.height) * .5 + statusBg.y);
            this.addChild(this._betText);
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

        private onPlaceBet(e:any):void
        {
            if(this._currentBetAmount != 0)
            {
                this.emit("placeBet", this._currentBetAmount);
                this._placeBetBtn.visible = false;
            }
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
            // Store current bet amount to then emit an event when player places a bet
            this._currentBetAmount = model.bet;

            // Update text box
            this._betText.text = "Bet: " + Helper.formatMoney(model.bet);

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
                    // Step one chip value lower
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