/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    export class AObservable implements IObservable
    {
        private _observers:Array<IObserver> = [];

        public attachObserver(observer:IObserver, immediateUpdate:boolean = true):void
        {
            if(this._observers.indexOf(observer) == -1)
                this._observers.push(observer);

            if(immediateUpdate)
                observer.update(this);
        }

        public detachObserver(observer:IObserver):void
        {
            var idx:number = this._observers.indexOf(observer);

            if(idx != -1)
                this._observers.splice(idx, 1);
        }

        public updateObservers(updateType:string = null):void
        {
            var observer:IObserver;
            for(var i:number = 0, l:number = this._observers.length; i < l; i++)
            {
                observer = this._observers[i];
                if(updateType)
                {
                    if(observer["update_" + updateType] !== undefined)
                        observer["update_" + updateType](this);
                    else
                        console.log("update_" + updateType + " not found on observer", observer);
                }
                else
                    observer.update(this);
            }
        }
    }
}