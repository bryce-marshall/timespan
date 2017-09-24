# @brycemarshall/exception

Represents a time interval which is able to be manipulated and compared arithmetically, and applied to Date object instances.

## Installation

npm install @brycemarshall/timespan

## The module exports the following types:

```ts
export declare class Timespan {
    private ms;
    /**
     * Creates a new Timespan instance.
     * @param ms The total number of milliseconds that this Timespan will represent.
     */
    constructor(ms?: number);
    /**
     *
     * @param days Creates a new Timespan instance reflecting the specified component values.
     * @param hours The hours value.
     * @param minutes The minute value.
     * @param seconds The seconds value.
     * @param milliseconds The milliseconds value.
     */
    static create(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): Timespan;
    /**
     * Returns the difference in time between two dates as a Timespan instance, by subtracting d2 from d1.
     * @param d1 The first date to compare.
     * @param d2 The second date to compare.
     */
    static difference(d1: Date, d2: Date): Timespan;
    /**
     * Gets the value of this instance expressed in milliseconds.
     */
    /**
     * Sets the value of this instance expressed as millisecnds.
     */
    totalMilliseconds: number;
    /**
     * Gets the value of this instance expressed in whole and fractional seconds.
     */
    /**
     * Sets the value of this instance expressed as whole and fractional seconds.
     */
    totalSeconds: number;
    /**
     * Gets the value of this instance expressed in whole and fractional minutes.
     */
    /**
     * Sets the value of this instance expressed as whole and fractional minutes.
     */
    totalMinutes: number;
    /**
     * Gets the value of this instance expressed in whole and fractional hours.
     */
    /**
     * Sets the value of this instance expressed as whole and fractional hours.
     */
    totalHours: number;
    /**
     * Gets the value of this instance expressed in whole and fractional days.
     */
    /**
     * Sets the value of this instance expressed as whole and fractional days.
     */
    totalDays: number;
    /**
     * Gets the value of this instance expressed in whole and fractional weeks.
     */
    /**
     * Sets the value of this instance expressed as whole and fractional weeks.
     */
    totalWeeks: number;
    /**
     * Gets the days component of the time interval represented by the current TimeSpan instance.
     */
    /**
     * Sets the days component of the time interval represented by the current TimeSpan instance.
     */
    days: number;
    /**
     * Gets the hours component of the time interval represented by the current TimeSpan instance.
     */
    /**
     * Sets the hours component of the time interval represented by the current TimeSpan instance.
     */
    hours: number;
    /**
     * Gets the minutes component of the time interval represented by the current TimeSpan instance.
     */
    /**
     * Sets the minutes component of the time interval represented by the current TimeSpan instance.
     */
    minutes: number;
    /**
     * Gets the seconds component of the time interval represented by the current TimeSpan instance.
     */
    /**
     * Sets the seconds component of the time interval represented by the current TimeSpan instance.
     */
    seconds: number;
    /**
     * Gets the milliseconds component of the time interval represented by the current TimeSpan instance.
     */
    /**
     * Sets the milliseconds component of the time interval represented by the current TimeSpan instance.
     */
    milliseconds: number;
    /**
     * Adds the value of the specified Timespan to this instance.
     * @param value The Timespan to add.
     */
    add(value: Timespan): void;
    /**
     * Subtracts the value of the specified Timespan from this instance.
     * @param value The Timespan to substract.
     */
    subtract(value: Timespan): void;
    /**
     * Adds the value of this instance to the specified Date.
     * @param value The date to add the value of this instance to.
     */
    addToDate(value: Date): Date;
    /**
     * Subtracts the value of this instance from the specified Date.
     * @param value The date to subtract the value of this instance from.
     */
    subtractFromDate(value: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of milliseconds.
     * @param value The number of milliseconds.
     */
    static fromMilliseconds(value: number): Timespan;
    /**
     * Adds the specified number of milliseconds to this instance.
     * @param value The number of milliseconds.
     */
    addMilliseconds(value: number): Timespan;
    /**
     * Adds the specified number of milliseconds to the specified date.
     * @param value The number of milliseconds.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addMillisecondsToDate(value: number, date?: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of seconds.
     * @param value The number of seconds.
     */
    static fromSeconds(value: number): Timespan;
    /**
     * Adds the specified number of seconds to this instance.
     * @param value The number of seconds.
     */
    addSeconds(value: number): Timespan;
    /**
     * Adds the specified number of seconds to the specified date.
     * @param value The number of seconds.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addSecondsToDate(value: number, date?: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of minutes.
     * @param value The number of minutes.
     */
    static fromMinutes(value: number): Timespan;
    /**
     * Adds the specified number of minutes to this instance.
     * @param value The number of minutes.
     */
    addMinutes(value: number): Timespan;
    /**
     * Adds the specified number of minutes to the specified date.
     * @param value The number of minutes.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addMinutesToDate(value: number, date?: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of hours.
     * @param value The number of hours.
     */
    static fromHours(value: number): Timespan;
    /**
     * Adds the specified number of hours to this instance.
     * @param value The number of hours.
     */
    addHours(value: number): Timespan;
    /**
     * Adds the specified number of hours to the specified date.
     * @param value The number of hours.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addHoursToDate(value: number, date?: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of days.
     * @param value The number of days.
     */
    static fromDays(value: number): Timespan;
    /**
     * Adds the specified number of days to this instance.
     * @param value The number of days.
     */
    addDays(value: number): Timespan;
    /**
     * Adds the specified number of days to the specified date.
     * @param value The number of days.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addDaysToDate(value: number, date?: Date): Date;
    /**
     * Creates a Timespan object with a value of the specified number of weeks.
     * @param value The number of weeks.
     */
    static fromWeeks(value: number): Timespan;
    /**
     * Adds the specified number of weeks to this instance.
     * @param value The number of weeks.
     */
    addWeeks(value: number): Timespan;
    /**
     * Adds the specified number of weeks to the specified date.
     * @param value The number of weeks.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addWeeksToDate(value: number, date?: Date): Date;
    /**
     * Inverts the value (switches the sign) of this instance.
     */
    negate(): void;
    /**
     * Returns the sign this Timespan, indicating whether the value is positive, negative or zero.
     */
    sign(): any;
    /**
     * Compares two TimeSpan objects and returns an integer that indicates whether the first value is shorter than, equal to, or longer than the second value.
     * @param t1 The first Timespan to compare.
     * @param t2 The second Timespan to compare.
     */
    static compare(t1: Timespan, t2: Timespan): number;
    /**
     * Compares this instance to a specified TimeSpan object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the TimeSpan object.
     * @param value A Timespan object to compare to this instance.
     */
    compareTo(value: Timespan): number;
    /**
     * Returns true if this instance is equal to the specified Timespan object, otherwise returns false.
     */
    equalTo(value: Timespan): boolean;
    /**
     * Returns true if this instance is less than the specified Timespan object, otherwise returns false.
     */
    lessThan(value: Timespan): boolean;
    /**
     * Returns true if this instance is greater than the specified Timespan object, otherwise returns false.
     */
    greaterThan(value: Timespan): boolean;
    /**
     * Creates a copy of this instance.
     */
    clone(): Timespan;
    private static evalMillis(value);
    private static validateRange(value, min, max, paramName?);
    static validateInt(value: number, paramName?: string): void;
}

```

## Contributors

 - Bryce Marshall

## MIT Licenced
