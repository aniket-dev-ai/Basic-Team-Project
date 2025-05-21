"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";

// Popular timezones (You can expand this as needed)
const timezones = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

function convertTime(
  time: string,
  from: string,
  to: string
): { converted?: string; error?: string } {
  if (!time || !from || !to) return { error: "Please provide all fields." };

  const today = DateTime.local().setZone(from);
  const [hour, minute] = time.split(":").map(Number);
  if (
    isNaN(hour) ||
    isNaN(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  )
    return { error: "Invalid time format." };

  const dt = today.set({ hour, minute, second: 0, millisecond: 0 });
  if (!dt.isValid) return { error: "Invalid input time or timezone." };

  const converted = dt.setZone(to);
  if (!converted.isValid) return { error: "Invalid target timezone." };

  const result = converted.toFormat("HH:mm, dd LLL yyyy (ZZZZ)");
  return { converted: result };
}

export default function TimezoneConverter() {
  const [time, setTime] = useState("");
  const [fromTz, setFromTz] = useState("UTC");
  const [toTz, setToTz] = useState("Asia/Kolkata");
  const [result, setResult] = useState<{
    converted?: string;
    error?: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conversionResult = convertTime(time, fromTz, toTz);
    setResult(conversionResult);
  };
    const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if (value === "from") setFromTz(e.target.value);
        else if (value === "to") setToTz(e.target.value);
    };
  return (
    <Card className="max-w-lg mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <Clock className="w-8 h-8 text-primary" />
        <CardTitle className="text-2xl font-bold text-primary">
          Timezone Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="time" className="text-lg">
                Time (24h)
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="from" className="text-lg">
                From Timezone
              </Label>
              <Select value={fromTz} onValueChange={setFromTz}>
                <SelectTrigger id="from" className="mt-2">
                  <SelectValue placeholder="From Timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="to" className="text-lg">
                To Timezone
              </Label>
              <Select value={toTz} onValueChange={setToTz}>
                <SelectTrigger id="to" className="mt-2">
                  <SelectValue placeholder="To Timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Convert Time
          </Button>
        </form>

        {result && result.error && (
          <div className="text-red-600 font-semibold mt-6">{result.error}</div>
        )}

        {result && result.converted && (
          <Card className="mt-6 border-primary border-2 bg-primary/10">
            <CardContent>
              <div className="text-md font-semibold text-primary space-y-2">
                Converted Time:
                <span className="ml-2 font-bold text-foreground">
                  {result.converted}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
