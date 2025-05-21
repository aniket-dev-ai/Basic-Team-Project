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

const OPERATIONS = [
  { label: "Add", value: "add" },
  { label: "Subtract", value: "subtract" },
  { label: "Multiply", value: "multiply" },
  { label: "Divide", value: "divide" },
];

function calculate(num1: number, num2: number, operation: string) {
  if (isNaN(num1) || isNaN(num2)) return { error: "Invalid number(s)" };
  if (operation === "add") return { result: num1 + num2 };
  if (operation === "subtract") return { result: num1 - num2 };
  if (operation === "multiply") return { result: num1 * num2 };
  if (operation === "divide") {
    if (num2 === 0) return { error: "Division by zero!" };
    return { result: num1 / num2 };
  }
  return { error: "Unknown operation" };
}

export function BasicCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<null | {
    result?: number;
    error?: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculate(Number(num1), Number(num2), operation));
  };

  return (
    <Card className="max-w-md mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          Basic Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="num1">Number 1</Label>
            <Input
              id="num1"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="num2">Number 2</Label>
            <Input
              id="num2"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
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
                {OPERATIONS.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Calculate
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
