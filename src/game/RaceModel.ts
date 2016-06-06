/**
 * Created by gio on 6/4/16.
 */
namespace com.gionadirashvili.therace
{
    export class RaceModel extends AObservable
    {
        public turtleCount:number = 3;

        private _observable:AObservable = new AObservable();

        public constructor()
        {
            super();
        }
    }
}