/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    export class RaceModel extends AObservable
    {
        public turtleCount:number = 3;

        private _winningTurtleIndex:number;
        private _playerTurtleIndex:number;
        private _betAmount:number;

        public constructor()
        {
            super();
        }

        public receiveBet(turtleIndex:number, betAmount:number):void
        {
            // Playing pretty fair here ;)
            // Generate winning turtle index
            this._winningTurtleIndex = Math.floor((Math.random() * 100) / (100 / this.turtleCount));

            // Store player bet amount and turtle index
            this._playerTurtleIndex = turtleIndex;
            this._betAmount = betAmount;
        }

        public get winnerIndex():number { return this._winningTurtleIndex; }
    }
}