/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    export class BetSystemModel extends AObservable
    {
        private _balance:number = 0;
        private _bet:number = 0;

        public constructor()
        {
            super();
        }

        public addBet(value:number):void
        {
            if(this._balance < value)
            {
                console.warn("Not enough balance");
                return;
            }

            this._balance -= value;
            this._bet += value;

            this.updateObservers("balance");
            this.updateObservers("bet");
        }

        public get balance():number { return this._balance; }
        public set balance(value:number)
        {
            this._balance = value;
            this.updateObservers("balance");
        }

        public get bet():number { return this._bet; }
    }
}