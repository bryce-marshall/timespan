import { ArgumentNullException, ArgumentOutOfRangeException, ArgumentException } from "@brycemarshall/exception";
import { SimpleException } from "@brycemarshall/simple-exception";

/**
 * Represents a time interval.
 */
export class Timespan {
    /**
     * Creates a new Timespan instance.
     * @param ms The total number of milliseconds that this Timespan will represent.
     */
    constructor(private ms?: number) {
        if (ms == null) this.ms = 0;
        else if (ms < -0x1EB208C2DC0000 || ms > 0x1EB208C2DC0000) throw new ArgumentOutOfRangeException("ms", -0x1EB208C2DC0000, 0x1EB208C2DC0000);
    }

    /**
     * 
     * @param days Creates a new Timespan instance reflecting the specified component values.
     * @param hours The hours value.
     * @param minutes The minute value.
     * @param seconds The seconds value.
     * @param milliseconds The milliseconds value.
     */
    static create(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        if (!days) days = 0;
        if (!hours) hours = 0;
        if (!minutes) minutes = 0;
        if (!seconds) seconds = 0;
        if (!milliseconds) milliseconds = 0;
        Timespan.validateInt(days, "days");
        Timespan.validateInt(hours, "hours");
        Timespan.validateInt(minutes, "minutes");
        Timespan.validateInt(seconds, "seconds");
        Timespan.validateInt(milliseconds, "milliseconds");
        Timespan.validateRange(days, -0x5F5E100, 0x5F5E100, "days");
        Timespan.validateRange(hours, -23, 23, "hours");
        Timespan.validateRange(minutes, -60, 60, "minutes");
        Timespan.validateRange(seconds, -60, 60, "seconds");
        Timespan.validateRange(milliseconds, -999, 999, "milliseconds");

        return new Timespan(Timespan.evalMillis(days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds));
    }

    /**
     * Returns the difference in time between two dates as a Timespan instance, by subtracting d2 from d1.
     * @param d1 The first date to compare.
     * @param d2 The second date to compare.
     */
    static difference(d1: Date, d2: Date): Timespan {
        if (d1 == null) throw new ArgumentNullException("d1");
        if (d2 == null) throw new ArgumentNullException("d2");

        return new Timespan(d1.getTime() - d2.getTime());
    }

    /**
     * Gets the value of this instance expressed in milliseconds.
     */
    get totalMilliseconds(): number {
        return this.ms;
    }

    /**
     * Sets the value of this instance expressed as millisecnds.
     */
    set totalMilliseconds(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x1EB208C2DC0000, 0x1EB208C2DC0000);
        this.ms = value;
    }

    /**
     * Gets the value of this instance expressed in whole and fractional seconds.
     */
    get totalSeconds(): number {
        return this.totalMilliseconds / 1000;
    }

    /**
     * Sets the value of this instance expressed as whole and fractional seconds.
     */
    set totalSeconds(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x7DBA8218000, 0x7DBA8218000);
        this.ms = value * 1000;
    }

    /**
     * Gets the value of this instance expressed in whole and fractional minutes.
     */
    get totalMinutes(): number {
        return this.totalMilliseconds / 60000;
    }

    /**
     * Sets the value of this instance expressed as whole and fractional minutes.
     */
    set totalMinutes(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x218711A000, 0x218711A000);
        this.ms = value * 60000;
    }

    /**
     * Gets the value of this instance expressed in whole and fractional hours.
     */
    get totalHours(): number {
        return this.totalMilliseconds / 3600000;
    }

    /**
     * Sets the value of this instance expressed as whole and fractional hours.
     */
    set totalHours(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x8F0D1800, 0x8F0D1800);
        this.ms = value * 3600000;
    }

    /**
     * Gets the value of this instance expressed in whole and fractional days.
     */
    get totalDays(): number {
        return this.totalMilliseconds / 86400000;
    }

    /**
     * Sets the value of this instance expressed as whole and fractional days.
     */
    set totalDays(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x5F5E100, 0x5F5E100);
        this.ms = value * 86400000;
    }

    /**
     * Gets the value of this instance expressed in whole and fractional weeks.
     */
    get totalWeeks(): number {
        return this.totalMilliseconds / 604800000;
    }

    /**
     * Sets the value of this instance expressed as whole and fractional weeks.
     */
    set totalWeeks(value: number) {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -14285714.285714285, 14285714.285714285);
        this.ms = value * 604800000;
    }

    /**
     * Gets the days component of the time interval represented by the current TimeSpan instance.
     */
    get days(): number {
        return Math.floor(Math.abs(this.ms) / 86400000) * this.sign();
    }

    /**
     * Sets the days component of the time interval represented by the current TimeSpan instance.
     */
    set days(value: number) {
        Timespan.validateInt(value);
        Timespan.validateRange(value, -0x5F5E100, 0x5F5E100);
        this.ms = Timespan.evalMillis(this.ms + (value - this.days) * 86400000);
    }

    /**
     * Gets the hours component of the time interval represented by the current TimeSpan instance.
     */
    get hours(): number {
        return (Math.floor(Math.abs(this.ms) / 3600000) % 24) * this.sign();
    }

    /**
     * Sets the hours component of the time interval represented by the current TimeSpan instance.
     */
    set hours(value: number) {
        Timespan.validateInt(value);
        Timespan.validateRange(value, -23, 23);
        this.ms = Timespan.evalMillis(this.ms + (value - this.hours) * 3600000);
    }

    /**
     * Gets the minutes component of the time interval represented by the current TimeSpan instance.
     */
    get minutes(): number {
        return (Math.floor(Math.abs(this.ms) / 60000) % 60) * this.sign();
    }

    /**
     * Sets the minutes component of the time interval represented by the current TimeSpan instance.
     */
    set minutes(value: number) {
        Timespan.validateInt(value);
        Timespan.validateRange(value, -59, 59);
        this.ms = Timespan.evalMillis(this.ms + (value - this.minutes) * 60000);
    }

    /**
     * Gets the seconds component of the time interval represented by the current TimeSpan instance.
     */
    get seconds(): number {
        return (Math.floor(Math.abs(this.ms) / 1000) % 60) * this.sign();
    }

    /**
     * Sets the seconds component of the time interval represented by the current TimeSpan instance.
     */
    set seconds(value: number) {
        Timespan.validateInt(value);
        Timespan.validateRange(value, -59, 59);
        this.ms = Timespan.evalMillis(this.ms + (value - this.seconds) * 1000);
    }

    /**
     * Gets the milliseconds component of the time interval represented by the current TimeSpan instance.
     */
    get milliseconds(): number {
        return (Math.abs(this.ms) % 1000) * this.sign();
    }

    /**
     * Sets the milliseconds component of the time interval represented by the current TimeSpan instance.
     */
    set milliseconds(value: number) {
        Timespan.validateInt(value);
        Timespan.validateRange(value, -999, 999);
        this.ms = Timespan.evalMillis(this.ms + value - this.milliseconds);
    }

    /**
     * Adds the value of the specified Timespan to this instance.
     * @param value The Timespan to add.
     */
    add(value: Timespan) {
        if (value == null) throw new ArgumentNullException("value");
        this.ms = Timespan.evalMillis(this.ms + value.totalMilliseconds);
    }

    /**
     * Subtracts the value of the specified Timespan from this instance.
     * @param value The Timespan to substract.
     */
    subtract(value: Timespan) {
        if (value == null) throw new ArgumentNullException("value");
        this.ms = Timespan.evalMillis(this.ms - value.totalMilliseconds);
    }

    /**
     * Adds the value of this instance to the specified Date.
     * @param value The date to add the value of this instance to.
     */
    addToDate(value: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        value.setTime(value.getTime() + this.totalMilliseconds);
        return value;
    }

    /**
     * Subtracts the value of this instance from the specified Date.
     * @param value The date to subtract the value of this instance from.
     */
    subtractFromDate(value: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        value.setTime(value.getTime() - this.totalMilliseconds);
        return value;
    }

    /**
     * Creates a Timespan object with a value of the specified number of milliseconds.
     * @param value The number of milliseconds.
     */
    static fromMilliseconds(value: number): Timespan {
        Timespan.validateInt(value);
        return new Timespan().addMilliseconds(value);
    }

    /**
     * Adds the specified number of milliseconds to this instance.
     * @param value The number of milliseconds.
     */
    addMilliseconds(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateInt(value);
        Timespan.validateRange(value, -0x1EB208C2DC0000, 0x1EB208C2DC0000);
        this.ms = Timespan.evalMillis(this.ms + value);
        return this;
    }

    /**
     * Adds the specified number of milliseconds to the specified date.
     * @param value The number of milliseconds.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addMillisecondsToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateInt(value);
        Timespan.validateRange(value, -0x1EB208C2DC0000, 0x1EB208C2DC0000);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value));
        return date;
    }

    /**
     * Creates a Timespan object with a value of the specified number of seconds.
     * @param value The number of seconds.
     */
    static fromSeconds(value: number): Timespan {
        return new Timespan().addSeconds(value);
    }

    /**
     * Adds the specified number of seconds to this instance.
     * @param value The number of seconds.
     */
    addSeconds(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x7DBA8218000, 0x7DBA8218000);
        this.ms = Timespan.evalMillis(this.ms + value * 1000);
        return this;
    }

    /**
     * Adds the specified number of seconds to the specified date.
     * @param value The number of seconds.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addSecondsToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x7DBA8218000, 0x7DBA8218000);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value * 1000));
        return date;
    }

    /**
     * Creates a Timespan object with a value of the specified number of minutes.
     * @param value The number of minutes.
     */
    static fromMinutes(value: number): Timespan {
        return new Timespan().addMinutes(value);
    }

    /**
     * Adds the specified number of minutes to this instance.
     * @param value The number of minutes.
     */
    addMinutes(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x218711A000, 0x218711A000);
        this.ms = Timespan.evalMillis(this.ms + value * 60000);
        return this;
    }

    /**
     * Adds the specified number of minutes to the specified date.
     * @param value The number of minutes.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addMinutesToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x218711A000, 0x218711A000);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value * 60000));
        return date;
    }

    /**
     * Creates a Timespan object with a value of the specified number of hours.
     * @param value The number of hours.
     */
    static fromHours(value: number): Timespan {
        return new Timespan().addHours(value);
    }

    /**
     * Adds the specified number of hours to this instance.
     * @param value The number of hours.
     */
    addHours(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x8F0D1800, 0x8F0D1800);
        this.ms = Timespan.evalMillis(this.ms + value * 3600000);
        return this;
    }

    /**
     * Adds the specified number of hours to the specified date.
     * @param value The number of hours.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addHoursToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x8F0D1800, 0x8F0D1800);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value * 3600000));
        return date;
    }

    /**
     * Creates a Timespan object with a value of the specified number of days.
     * @param value The number of days.
     */
    static fromDays(value: number): Timespan {
        return new Timespan().addDays(value);
    }

    /**
     * Adds the specified number of days to this instance.
     * @param value The number of days.
     */
    addDays(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x5F5E100, 0x5F5E100);
        this.ms = Timespan.evalMillis(this.ms + value * 86400000);
        return this;
    }

    /**
     * Adds the specified number of days to the specified date.
     * @param value The number of days.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addDaysToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -0x5F5E100, 0x5F5E100);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value * 86400000));
        return date;
    }

    /**
     * Creates a Timespan object with a value of the specified number of weeks.
     * @param value The number of weeks.
     */
    static fromWeeks(value: number): Timespan {
        return new Timespan().addWeeks(value);
    }

    /**
     * Adds the specified number of weeks to this instance.
     * @param value The number of weeks.
     */
    addWeeks(value: number): Timespan {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -14285714.285714285, 14285714.285714285);
        this.ms = Timespan.evalMillis(this.ms + value * 604800000);
        return this;
    }

    /**
     * Adds the specified number of weeks to the specified date.
     * @param value The number of weeks.
     * @param date The date to add value to (if date is not specified then the current system time is used).
     */
    static addWeeksToDate(value: number, date?: Date): Date {
        if (value == null) throw new ArgumentNullException("value");
        Timespan.validateRange(value, -14285714.285714285, 14285714.285714285);
        if (date == null) date = new Date();
        date.setTime(Timespan.evalMillis(date.getTime() + value * 604800000));
        return date;
    }

    /**
     * Inverts the value (switches the sign) of this instance.
     */
    negate() {
        this.ms *= -1;
    }

    /**
     * Returns the sign this Timespan, indicating whether the value is positive, negative or zero.
     */
    sign() {
        if (Math.abs(this.ms) == 0) return 0;
        return this.ms > 0 ? 1 : -1;
    }

    /**
     * Compares two TimeSpan objects and returns an integer that indicates whether the first value is shorter than, equal to, or longer than the second value.
     * @param t1 The first Timespan to compare.
     * @param t2 The second Timespan to compare.
     */
    static compare(t1: Timespan, t2: Timespan): number {
        if (t1 == null) throw new ArgumentNullException("t1");
        if (t2 == null) throw new ArgumentNullException("t2");
        return t1.totalMilliseconds - t2.totalMilliseconds;
    }

    /**
     * Compares this instance to a specified TimeSpan object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the TimeSpan object.
     * @param value A Timespan object to compare to this instance.
     */
    compareTo(value: Timespan): number {
        if (value == null) throw new ArgumentNullException("value");
        return this.totalMilliseconds - value.totalMilliseconds;
    }

    /**
     * Returns true if this instance is equal to the specified Timespan object, otherwise returns false.
     */
    equalTo(value: Timespan): boolean {
        if (value == null) throw new ArgumentNullException("value");
        return this.totalMilliseconds == value.totalMilliseconds;
    }

    /**
     * Returns true if this instance is less than the specified Timespan object, otherwise returns false.
     */
    lessThan(value: Timespan): boolean {
        if (value == null) throw new ArgumentNullException("value");
        return this.totalMilliseconds < value.totalMilliseconds;
    }

    /**
     * Returns true if this instance is greater than the specified Timespan object, otherwise returns false.
     */
    greaterThan(value: Timespan): boolean {
        if (value == null) throw new ArgumentNullException("value");
        return this.totalMilliseconds > value.totalMilliseconds;
    }

    /**
     * Creates a copy of this instance.
     */
    clone() {
        return new Timespan(this.ms);
    }

    /**
     * Converts the value of the current TimeSpan object to its equivalent string representation.
     */
    toString() {
        let r: string;
        if (this.ms < 0)
            r = "-";
        else r = "";

        if (this.days != 0)
            r += Math.abs(this.days) + ".";

        r += (
            Timespan.formatDigit(this.hours) +
            ":" + Timespan.formatDigit(this.minutes) +
            ":" + Timespan.formatDigit(this.seconds) +
            "." + Timespan.formatDigit(this.milliseconds, true)
        );

        return r;
    }

    private static formatDigit(d: number, extra?: boolean): string {
        d = Math.abs(d);
        if (!extra)
            return d > 9 ? d.toString() : "0" + d;

        if (d < 10)
            return "00" + d;
        if (d < 100)
            return "0" + d;

        return d.toString();
    }

    private static evalMillis(value: number): number {
        value = Math.round(value);
        if (value < -0x1EB208C2DC0000 || value > 0x1EB208C2DC0000) throw new SimpleException("Overflow");
        return value;
    }

    private static validateRange(value: number, min: number, max: number, paramName?: string) {
        if (value < min || value > max) throw new ArgumentOutOfRangeException(paramName ? paramName : "value", min, max);
    }

    private static validateInt(value: number, paramName?: string) {
        if (typeof (value) != "number" || value != Math.floor(value)) throw new ArgumentException(paramName ? paramName : "value", "Must be an integer.");
    }
}