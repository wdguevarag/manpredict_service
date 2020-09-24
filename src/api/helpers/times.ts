import { Moment } from 'moment';

export const addMinutes = (date: Moment, minutes: number): Moment => {
    return date.clone().add(minutes, 'minutes');
};
