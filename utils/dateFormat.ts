import { format, parse } from 'date-fns';

export const formatEventTime = (timeString: string) => {
    try {
        const [datePart, timePart] = timeString.split(' ');
        const [startTime, endTime] = timePart.split('-');
        const date = parse(datePart, 'yyyy-MM-dd', new Date());
        const formattedDate = format(date, 'MMM d');
    
        const start = parse(startTime, 'HH:mm:ss', new Date());
        const end = parse(endTime, 'HH:mm:ss', new Date());
        
        const formattedStartTime = format(start, 'h:mm a');
        const formattedEndTime = format(end, 'h:mm a');

        return `${formattedDate} from ${formattedStartTime} - ${formattedEndTime}`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return timeString;
    }
}; 