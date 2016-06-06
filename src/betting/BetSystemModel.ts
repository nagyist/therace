/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    export class BetSystemModel extends AObservable
    {
        private _balance:number = 0;

        public constructor()
        {
            super();
        }

        public get balance():number { return this._balance; }
        public set balance(value:number)
        {
            this._balance = value;
            this.updateObservers("balance");
        }
    }
}