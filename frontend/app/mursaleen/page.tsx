"use client";
import React, { useState } from "react";
import PasswordStrengthChecker from "@/components/PasswordChecker";
import StringAnalyzer from "@/components/StringAnalyzer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const options = [
  { label: "String Analyzer", value: "string" },
  { label: "Password Strength Checker", value: "password" },
];

const Page = () => {
  const [selected, setSelected] = useState("string");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      {/* Tab Buttons */}
      <Card className="flex flex-row gap-3 p-2 mb-6 shadow-md">
        {options.map((op) => (
          <Button
            key={op.value}
            variant={selected === op.value ? "default" : "outline"}
            onClick={() => setSelected(op.value)}
            className={`transition-all duration-200 font-semibold ${
              selected === op.value
                ? "shadow-lg scale-105"
                : "hover:bg-primary/10"
            }`}
          >
            {op.label}
          </Button>
        ))}
      </Card>

      {/* Show Only One Component At A Time */}
      <Card className="w-full max-w-xl">
        <CardContent>
          {selected === "string" && <StringAnalyzer />}
          {selected === "password" && <PasswordStrengthChecker />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
