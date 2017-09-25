import { suite, test } from "mocha-typescript";
import { expect } from "chai";

import { Timespan } from "./package-src/index";

@suite class TimespanTests {
    private totalMilliseconds: number;
    private totalSeconds: number;
    private totalMinutes: number;
    private totalHours: number;
    private totalDays: number;

    @test("To String") ToString() {
        expect(Timespan.create(1, 1, 1, 1, 1).toString()).to.equal("1.01:01:01.001");
    }

    @test("To String Neg") ToStringNeg() {
        let ts = Timespan.create(1, 1, 1, 1, 1);
        ts.negate();
        expect(ts.toString()).to.equal("-1.01:01:01.001");
    }

    @test("To String Min") ToStringMin() {
        expect(new Timespan().toString()).to.equal("00:00:00.000");
    }

    @test("To String Max no days") ToStringMaxNoDays() {
        expect(Timespan.create(0, 23, 59, 59, 999).toString()).to.equal("23:59:59.999");
    }

    @test("To String Max no days Neg") ToStringMaxNoDaysNeg() {
        let ts = Timespan.create(0, 23, 59, 59, 999);
        ts.negate();
        expect(ts.toString()).to.equal("-23:59:59.999");
    }    

    @test("From Milliseconds") testFromMillis() {
        this.eval(this.fromMilliseconds(1500));
    }

    @test("From Seconds") testFromSeconds() {
        this.eval(this.fromSeconds(2562748.98733));
    }

    @test("From Minutes") testFromMinutes() {
        this.eval(this.fromMinutes(19000));
    }

    @test("From Hours") testFromHours() {
        this.eval(this.fromHours(8746755.3457));
    }

    @test("From Days") testFromDays() {
        this.eval(this.fromDays(150));
    }

    @test("Assign Components Init Zero") assignCompInitZero() {
        this.assignCompTest(0, 1502639874, 17, 9, 23, 59, 874);
    }

    @test("Assign Neg Components Init Zero") assignNegCompInitZero() {
        this.assignCompTest(0, -1502639874, -17, -9, -23, -59, -874);
    }

    @test("Assign Components Init Current") assignCompInitCurrent() {
        this.assignCompTest(new Date().getTime(), 1502639874, 17, 9, 23, 59, 874);
    }

    @test("Create Components") createComp() {
        this.createCompTest(1502639874, 17, 9, 23, 59, 874);
    }

    @test("Create Components Neg") createCompNeg() {
        this.createCompTest(-1502639874, -17, -9, -23, -59, -874);
    }

    @test("Negate") Negate() {
        let pos = Timespan.create(17, 9, 23, 59, 874);
        let neg = Timespan.create(-17, -9, -23, -59, -874);
        let cmp = pos.clone();
        cmp.negate();
        expect(cmp.totalMilliseconds).to.equal(neg.totalMilliseconds, "neg.totalMilliseconds");
        cmp.negate();
        expect(cmp.totalMilliseconds).to.equal(pos.totalMilliseconds, "pos.totalMilliseconds");
    }

    assignCompTest(initialMillis: number, expectedMillis: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
        let ts = new Timespan(initialMillis);
        ts.days = days;
        ts.hours = hours;
        ts.minutes = minutes;
        ts.seconds = seconds;
        ts.milliseconds = milliseconds;

        expect(ts.days).to.equal(days, "days");
        expect(ts.hours).to.equal(hours, "hours");
        expect(ts.minutes).to.equal(minutes, "minutes");
        expect(ts.seconds).to.equal(seconds, "seconds");
        expect(ts.milliseconds).to.equal(milliseconds, "milliseconds");
        expect(ts.totalMilliseconds).to.equal(expectedMillis, "expectedMillis");
    }

    createCompTest(expectedMillis: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
        let ts = Timespan.create(days, hours, minutes, seconds, milliseconds);

        expect(ts.days).to.equal(days, "days");
        expect(ts.hours).to.equal(hours, "hours");
        expect(ts.minutes).to.equal(minutes, "minutes");
        expect(ts.seconds).to.equal(seconds, "seconds");
        expect(ts.milliseconds).to.equal(milliseconds, "milliseconds");
        expect(ts.totalMilliseconds).to.equal(expectedMillis, "expectedMillis");
    }

    reset() {
        this.totalMilliseconds = null;
        this.totalSeconds = null;
        this.totalMinutes = null;
        this.totalHours = null;
        this.totalDays = null;
    }

    fromDays(value: number): Timespan {
        this.applyMilliseconds(Math.round(value * 86400000));
        return Timespan.fromDays(value);
    }

    fromHours(value: number): Timespan {
        this.applyMilliseconds(Math.round(value * 3600000));
        return Timespan.fromHours(value);
    }

    fromMinutes(value: number): Timespan {
        this.applyMilliseconds(Math.round(value * 60000));
        return Timespan.fromMinutes(value);
    }

    fromSeconds(value: number): Timespan {
        this.applyMilliseconds(Math.round(value * 1000));
        return Timespan.fromSeconds(value);
    }

    fromMilliseconds(value: number): Timespan {
        this.applyMilliseconds(value);
        return Timespan.fromMilliseconds(value);
    }

    applyMilliseconds(value: number) {
        this.reset();
        value = Math.round(value);
        this.totalMilliseconds = value;
        this.totalDays = value / 86400000;
        this.totalHours = value / 3600000;
        this.totalMinutes = value / 60000;
        this.totalSeconds = value / 1000;
    }

    eval(ts: Timespan) {
        if (this.totalMilliseconds)
            expect(ts.totalMilliseconds).to.equal(this.totalMilliseconds, "milliseconds");

        if (this.totalSeconds)
            expect(ts.totalSeconds).to.equal(this.totalSeconds, "totalSeconds");

        if (this.totalMinutes)
            expect(ts.totalMinutes).to.equal(this.totalMinutes, "totalMinutes");

        if (this.totalHours)
            expect(ts.totalHours).to.equal(this.totalHours, "totalHours");

        if (this.totalDays)
            expect(ts.totalDays).to.equal(this.totalDays, "totalDays");

    }
}