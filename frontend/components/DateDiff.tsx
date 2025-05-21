"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from "lucide-react";

function calculateDifference(start: string, end: string) {
  if (!start || !end) return { error: "Both dates are required." };
  const d1 = new Date(start);
  const d2 = new Date(end);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime()))
    return { error: "Invalid date format." };

  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();

  if (days < 0) {
    months--;
    // Get days in the previous month
    const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const msDiff = d2.getTime() - d1.getTime();
  const daysTotal = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  if (msDiff < 0) return { error: "End date must be after start date." };

  return {
    years,
    months,
    days,
    daysTotal,
    error: null,
  };
}

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<null | ReturnType<
    typeof calculateDifference
  >>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateDifference(startDate, endDate));
  };

  return (
    <Card className="max-w-lg mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <CalendarDays className="w-8 h-8 text-primary" />
        <CardTitle className="text-2xl font-bold text-primary">
          Date Difference Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Label htmlFor="start-date" className="text-lg">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end-date" className="text-lg">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="mt-2"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Calculate Difference
          </Button>
        </form>

        {result && result.error && (
          <div className="text-red-600 font-semibold mt-6">{result.error}</div>
        )}

        {result && !result.error && (
          <Card className="mt-6 border-primary border-2 bg-primary/10">
            <CardContent>
              <div className="text-md font-semibold text-primary space-y-2">
                <div>
                  Years: <span className="font-bold">{result.years}</span>
                </div>
                <div>
                  Months: <span className="font-bold">{result.months}</span>
                </div>
                <div>
                  Days: <span className="font-bold">{result.days}</span>
                </div>
                <div>
                  <span className="text-sm text-foreground">
                    (Total Days:{" "}
                    <span className="font-bold">{result.daysTotal}</span>)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
