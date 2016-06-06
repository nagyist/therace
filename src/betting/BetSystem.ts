/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    export class BetSystem
    {
        private _model:BetSystemModel;
        private _view:BetSystemView;

        public constructor()
        {
            // Init model and view
            this._model = new BetSystemModel();
            this._view = new BetSystemView();

            // Add view as an observer to the model
            this._model.attachObserver(this._view);

            // Add listener to the view
            this._view.on("addBet", this.onAddBet.bind(this));

            // Initially get the balance
            this.getBalance();
        }

        private onAddBet(value:number):void
        {
            this._model.addBet(value);
        }

        private getBalance():void
        {
            this._model.balance = 200;
        }

        public get view():BetSystemView { return this._view; }
    }
}