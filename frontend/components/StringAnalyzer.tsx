"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

const OPERATIONS = [
  { label: "Count Vowels & Consonants", value: "count" },
  { label: "Reverse String", value: "reverse" },
  { label: "Palindrome Check", value: "palindrome" },
];

function analyzeString(text: string, operation: string): string {
  if (operation === "count") {
    const vowels = text.match(/[aeiouAEIOU]/g)?.length || 0;
    const consonants = text.match(/[a-zA-Z]/g)?.length || 0 - vowels;
    return `Vowels: ${vowels}, Consonants: ${consonants - vowels}`;
  } else if (operation === "reverse") {
    return text.split("").reverse().join("");
  } else if (operation === "palindrome") {
    const cleaned = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const isPalindrome = cleaned === cleaned.split("").reverse().join("");
    return isPalindrome ? "Yes, it's a palindrome!" : "No, not a palindrome.";
  }
  return "";
}

export default function StringAnalyzer() {
  const [text, setText] = useState("");
  const [operation, setOperation] = useState("count");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(analyzeString(text, operation));
  };

  return (
    <Card className="max-w-lg mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          String Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="text" className="text-lg">
              Enter your text
            </Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2"
              placeholder="Type your string here..."
              required
              autoFocus
            />
          </div>

          <div>
            <Label className="text-lg">Select Operation</Label>
            <RadioGroup
              className="flex flex-col space-y-2 mt-2"
              value={operation}
              onValueChange={setOperation}
            >
              {OPERATIONS.map((op) => (
                <div
                  key={op.value}
                  className="flex items-center gap-2 hover:bg-muted rounded-lg p-1 transition-all"
                >
                  <RadioGroupItem value={op.value} id={op.value} />
                  <Label htmlFor={op.value} className="cursor-pointer">
                    {op.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Analyze
          </Button>

          {result !== null && (
            <Card className="mt-5 border-primary border-2 bg-primary/10">
              <CardContent>
                <div className="text-md font-semibold text-primary">
                  Result:{" "}
                  <span className="text-secondary-foreground">{result}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
