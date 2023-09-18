import cron from 'node-cron';

const cronSchedule = 
    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
    }, {
        scheduled: true
    });

export const cronStart = () => cronSchedule.start();

export const cronStop = () => cronSchedule.stop();