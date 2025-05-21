"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

function checkPasswordStrength(password: string): {
  strength: "Weak" | "Medium" | "Strong";
  tips: string[];
  progress: number;
} {
  let tips: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 2;
  } else if (password.length >= 6) {
    score += 1;
    tips.push("Password should be at least 8 characters for strong strength.");
  } else {
    tips.push("Password should be at least 6 characters.");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    tips.push("Include at least one uppercase letter.");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    tips.push("Include at least one number.");
  }

  // Strength rules
  let strength: "Weak" | "Medium" | "Strong" = "Weak";
  let progress = (score / 4) * 100;
  if (score === 4) {
    strength = "Strong";
  } else if (score === 2 || score === 3) {
    strength = "Medium";
  }

  return { strength, tips, progress };
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong">(
    "Weak"
  );
  const [tips, setTips] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const res = checkPasswordStrength(password);
    setStrength(res.strength);
    setTips(res.tips);
    setProgress(res.progress);
  }, [password]);

  return (
    <Card className="max-w-lg mx-auto my-8 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Password Strength Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div>
            <Label htmlFor="password" className="text-lg">
              Enter Password
            </Label>
            <Input
              id="password"
              type="password"
              autoFocus
              placeholder="Type password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-lg">Strength:</Label>
            <span
              className={
                "ml-3 font-bold " +
                (strength === "Strong"
                  ? "text-green-600"
                  : strength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600")
              }
            >
              {strength}
            </span>
            <Progress value={progress} className="mt-2 h-3" />
          </div>

          {tips.length > 0 && (
            <div className="mt-3">
              <Label className="text-md mb-2">Tips to improve:</Label>
              <ul className="mt-1 space-y-1">
                {tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <XCircle className="w-4 h-4 text-destructive" /> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {password && tips.length === 0 && (
            <div className="mt-3 flex items-center gap-2 text-green-700 font-medium">
              <CheckCircle2 className="w-5 h-5" /> Perfect password!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
