/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    export interface IObserver
    {
        update(observable:IObservable):void;
    }

    export interface IObservable
    {
        attachObserver(observer:IObserver, immediateUpdate:boolean):void;
        detachObserver(observer:IObserver):void;
        updateObservers(updateType:string):void;
    }

    export interface IDisposable
    {
        dispose():void;
    }
}