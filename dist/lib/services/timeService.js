
const serverBus = new Vue();

export const timeService = {

    // TimeAgo
    updateTimeAgo_otb_fn(context) {
        var elements = $(".timeAgo");
        elements.each((index, element) => {
            var time = parseInt(element.id);
            var timeAgo = timeService.timeAgo_otb_fn(time);
            element.style.color = (new Date().getTime()/1000) - time > 20 ? "":"";
            element.innerHTML = timeAgo ? timeAgo + " ago" : "-";
        });
    },
    timeAgo_otb_fn(seconds) {
        const formatter = new Intl.RelativeTimeFormat("en");
        const ranges = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };
        const secondsElapsed = (seconds*1000 - Date.now()) / 1000;
        for (let key in ranges) {
            if (ranges[key] < Math.abs(secondsElapsed)) {
                const delta = secondsElapsed / ranges[key];
                var str = formatter.format(Math.floor(delta), key)
                    .replace("years", "y")
                    .replace("year", "y")
                    .replace("months", "mo")
                    .replace("month", "mo")
                    .replace("days", "d")
                    .replace("day", "d")
                    .replace("hours", "h")
                    .replace("hour", "h")
                    .replace("minutes", "m")
                    .replace("minute", "m")
                    .replace("seconds", "s")
                    .replace("second", "s")
                ;
                return str.substring(0, str.length-4);
            }
        }
    },
    toTimeAgo_otb_fn(seconds){
        if(seconds > 9000000000){
            seconds /=10000;
        }
        var t = new Date(1970, 0, 1);
        t.setSeconds(seconds);
        if(seconds < moment()){
            return timeService.to_YYYY_MM_DD_HH_MM_SS_otb_fn(t);
        }
        else{
            return timeService.to_HH_MM_otb_fn(t);
        }
    },
    to_HH_MM_otb_fn(t){
        return moment(t).format('HH:mm');
    },
    to_YYYY_MM_DD_HH_MM_SS_otb_fn(t){
        return moment(t).format('DD-MM-YYYY HH:mm:ss');
    },
    timeSpan_otb_fn(time) {
        if(time<0){
            return '-';
        }
        if(time > 2000000000)
        {
            time = time / 1000;
        }
        if(time > 86400){
            return parseInt(time/86400) + " days";
        }
        if(time > 3600){
            return parseInt(time/3600) + " h";
        }
        else if(time > 60){
            return parseInt(time/60) + " min";
        }
        else{
            return parseInt(time) + " sec";
        }
    },

}

export default {
    timeService,
    serverBus
}
