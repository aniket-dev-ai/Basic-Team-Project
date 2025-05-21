"use client";
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

const ARRAY_OPS = [
  { label: "Sort Ascending", value: "sort-asc" },
  { label: "Sort Descending", value: "sort-desc" },
  { label: "Filter Odd", value: "odd" },
  { label: "Filter Even", value: "even" },
  { label: "Sum", value: "sum" },
  { label: "Average", value: "average" },
  { label: "Minimum", value: "min" },
  { label: "Maximum", value: "max" },
];

function arrayOp(array: number[], operation: string) {
  if (array.length === 0) return { error: "Array is empty" };
  switch (operation) {
    case "sort-asc":
      return { result: [...array].sort((a, b) => a - b).join(", ") };
    case "sort-desc":
      return { result: [...array].sort((a, b) => b - a).join(", ") };
    case "odd":
      return { result: array.filter((x) => x % 2 !== 0).join(", ") };
    case "even":
      return { result: array.filter((x) => x % 2 === 0).join(", ") };
    case "sum":
      return { result: array.reduce((acc, val) => acc + val, 0) };
    case "average":
      return {
        result: (
          array.reduce((acc, val) => acc + val, 0) / array.length
        ).toFixed(2),
      };
    case "min":
      return { result: Math.min(...array) };
    case "max":
      return { result: Math.max(...array) };
    default:
      return { error: "Unknown operation" };
  }
}

export function ArrayHandler() {
  const [arrayStr, setArrayStr] = useState("");
  const [operation, setOperation] = useState("sort-asc");
  const [result, setResult] = useState<null | {
    result?: string | number;
    error?: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // sanitize input: comma/space separated to array
    const arr = arrayStr
      .split(/[\s,]+/)
      .map(Number)
      .filter((x) => !isNaN(x));
    setResult(arrayOp(arr, operation));
  };

  return (
    <Card className="max-w-md mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          Array Sorting & Filtering
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="arr">Enter Array (comma or space separated)</Label>
            <Input
              id="arr"
              value={arrayStr}
              onChange={(e) => setArrayStr(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                {ARRAY_OPS.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Go
          </Button>
        </form>
        {result && (
          <div className="mt-4 text-lg font-bold text-primary">
            {result.error
              ? `Error: ${result.error}`
              : `Result: ${result.result}`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
