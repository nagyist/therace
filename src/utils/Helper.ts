/**
 * Created by gio on 6/5/16.
 */
namespace com.gionadirashvili.therace
{
    export class Helper
    {
        public static formatMoney(value:number):string
        {
            return (value / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
    }
}