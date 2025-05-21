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

const PRIME_OPS = [
  { label: "Check if Prime", value: "is-prime" },
  { label: "Primes in Range", value: "primes-in-range" },
];

function isPrime(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function primesInRange(a: number, b: number) {
  const res = [];
  for (let i = Math.max(2, a); i <= b; i++) if (isPrime(i)) res.push(i);
  return res;
}

export function PrimeChecker() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState(""); // for range
  const [operation, setOperation] = useState("is-prime");
  const [result, setResult] = useState<null | {
    result?: string | boolean;
    error?: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (operation === "is-prime") {
      const n = Number(num1);
      if (isNaN(n)) setResult({ error: "Invalid number" });
      else
        setResult({ result: isPrime(n) ? "Yes, prime!" : "No, not a prime." });
    } else {
      const a = Number(num1),
        b = Number(num2);
      if (isNaN(a) || isNaN(b)) setResult({ error: "Invalid range" });
      else if (a > b) setResult({ error: "Start should be <= End" });
      else {
        const primes = primesInRange(a, b);
        setResult({
          result: primes.length
            ? primes.join(", ")
            : "No primes in this range.",
        });
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          Prime Number Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                {PRIME_OPS.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="num1">
              {operation === "primes-in-range" ? "Start of Range" : "Number"}
            </Label>
            <Input
              id="num1"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              required
            />
          </div>
          {operation === "primes-in-range" && (
            <div>
              <Label htmlFor="num2">End of Range</Label>
              <Input
                id="num2"
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            Check
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
