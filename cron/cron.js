function cron(seconds, minutes, hours) {
    let now = new Date();
    let now_seconds = now.getSeconds(); 
    let now_minutes = now.getMinutes(); 
    let now_hours = now.getHours();    

    seconds = calculateSeconds(seconds, now_seconds, minutes, now_minutes, hours);
    minutes = calculateMinutes(minutes, now_minutes, seconds, now_seconds, hours, now_hours);
    hours = calculateHours(hours, now_hours, minutes, now_minutes, seconds, now_seconds);

    let next = new Date();
    next.setHours(hours, minutes, seconds);
    
    return differenceInSeconds(now, next);
}

function calculateSeconds(seconds, now_seconds, minutes, minutes_now, hours) {
    if (isNaN(seconds)) {
        if (!isNaN(hours)) {
            return 0;
        }
        if (!isNaN(minutes) && minutes != minutes_now) {
            return 0;
        }
        return now_seconds + 1;
    } 
        
    return seconds;
}

function calculateMinutes(minutes, now_minutes, seconds, now_seconds, hours, now_hours) {
    if (isNaN(minutes)) {
        if (!isNaN(hours) && (hours != now_hours)) {
            return 0;
        }
        if (seconds > now_seconds) {
            return now_minutes;
        }

        return now_minutes + 1;
    } 
        
    return minutes;
}

function calculateHours(hours, now_hours, minutes, now_minutes, seconds, now_seconds) {
    if (isNaN(hours)) {
        if ((minutes > now_minutes) || (minutes == now_minutes && seconds > now_seconds)) {
            return now_hours;
        }
        return now_hours + 1;
    } 
        
    return hours;
}

function differenceInSeconds(now, next) {
    if (now > next) {
        next = addDay(next);
    }

    return parseInt((next.getTime() - now.getTime()) / 1000);
}

function addDay(date) {
    let tomorrow = new Date(date);
    tomorrow.setDate(date.getDate() + 1);
    return tomorrow;
}

function calculateCronsFromFile(filename) {
    const fs = require('fs');
    const readline = require('readline');
    
    const rl = readline.createInterface({
      input: fs.createReadStream('cron.txt'),
      crlfDelay: Infinity
    });
    
    rl.on('line', (line) => {
        let params = line.split(',');
        console.log(cron(params[0], params[1], params[2]));
    });
}

calculateCronsFromFile(process.argv[2]);
