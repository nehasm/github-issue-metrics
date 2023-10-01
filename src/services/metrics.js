export const calculateSinceTimestamp = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const daysUntilSunday = currentDate.getDay(); 
  
    // Subtract 70 days (10 weeks) plus daysUntilSunday
    currentDate.setDate(currentDate.getDate() - 70 - daysUntilSunday);

    // Convert the date to ISO 8601 format
    const isoDateString = currentDate.toISOString();
  
    // Remove milliseconds and timezone offset
    return isoDateString.slice(0, -5) + 'Z';
  };

const getWeekNumber = (date) => {
    const currentDate = new Date(date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0,0,0,0);
    const daysUntilSunday = todayDate.getDay() ? todayDate.getDay() : 0;
    todayDate.setDate(todayDate.getDate() - daysUntilSunday);
    if(todayDate < currentDate) {
        return
    } else {
        let sinceTimeStamp = new Date(calculateSinceTimestamp())
        let timeDiff  = currentDate.getTime() - sinceTimeStamp.getTime()
        let daysBet = timeDiff / (1000 * 60 * 60 * 24);
        return Math.floor(daysBet/7) + 1;
    }
}
    const addClosureRateDetails = (data) => {
        for (const week in data.weekWiseCount){
            const previousWeek = data.weekWiseCount[Number(week) - 1]
            const currentWeek = data.weekWiseCount[week];
            if(week === "1") {
                continue
            } else {
                let rate = currentWeek.closedCount / (currentWeek.openCount + (previousWeek.openCount - previousWeek.closeInAWeekCount)) * 100;
                currentWeek.closureRate = rate.toFixed(2)
            }
        }
        return data
    }
  export const getMetricsData = (issuesArray) => {
    let result = {
        openCount: 0,
        closedCount:0,
        weekWiseCount : {
        }
    }
    for(let i = 1; i <= 10; i++){
        result.weekWiseCount[i] = {
            openCount: 0,
            closedCount : 0,
            closeInAWeekCount: 0
        }
    }

    issuesArray.forEach((issue) => {
        if (issue.state === "open") {
            result.openCount++;
        } else if (issue.state === "closed") {
            result.closedCount++;
        }
        const created = getWeekNumber(issue.created_at);
        const closed = issue.closed_at ? getWeekNumber(issue.closed_at) : null;
        if(created && created <= 10) {result.weekWiseCount[11 - created].openCount++}
        if(closed && closed <= 10) {result.weekWiseCount[11 - closed].closedCount++}
        if(created && closed && created === closed) {result.weekWiseCount[11-closed].closeInAWeekCount++}
      });
      
      return addClosureRateDetails(result);
  }
