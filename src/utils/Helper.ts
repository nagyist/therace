/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    import DisplayObject = PIXI.DisplayObject;
    import Container = PIXI.Container;
    export class Helper
    {
        public static formatMoney(value:number):string
        {
            return (value / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }

        public static tint(list:Array<DisplayObject>, tint:number, recursive:boolean = true):void
        {
            var obj:DisplayObject;
            for(var i:number = 0, l:number = list.length; i < l; i++)
            {
                obj = list[i];

                if(obj.hasOwnProperty("children") && obj["children"] && obj["children"].length > 0)
                    Helper.tint(obj["children"], tint);
                else if(obj.hasOwnProperty("tint"))
                    obj["tint"] = tint;
            }
        }
    }

    export enum DayColors
    {
        Morning = 0xFFFFFFFF,
        Noon = 0xFFE9D37C,
        Evening = 0xFFEAAD55,
        Night = 0x005953D1
    }
}