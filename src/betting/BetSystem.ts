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

            // Initially get the balance
            this.getBalance();
        }

        private getBalance():void
        {
            this._model.balance = 200000;
        }

        public get view():BetSystemView { return this._view; }
    }
}