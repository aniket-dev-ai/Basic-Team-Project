"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    name: "Mursaleen",
    tasks: [
      {
        title: "String Analyzer",
        href: "/mursaleen",
        desc: "Analyze strings for vowels, palindromes, and more.",
      },
      {
        title: "Password Strength Checker",
        href: "/mursaleen-password",
        desc: "Instantly check password strength and get tips.",
      },
    ],
  },
  {
    name: "Aniket",
    tasks: [
      {
        title: "Array Handler",
        href: "/Aniket",
        desc: "Sort, filter, and analyze arrays easily.",
      },
    ],
  },
  {
    name: "Bishal",
    tasks: [
      {
        title: "Basic Calculator",
        href: "/Bishal",
        desc: "Do basic arithmetic with a simple calculator.",
      },
    ],
  },
  {
    name: "Piyush",
    tasks: [
      {
        title: "Timezone Converter",
        href: "/Piyush",
        desc: "Convert time between global timezones instantly.",
      },
    ],
  },
  {
    name: "Tejas",
    tasks: [
      {
        title: "Time Difference",
        href: "/Tejas",
        desc: "Calculate the time difference between two dates.",
      },
    ],
  },
  {
    name: "Vinod",
    tasks: [
      {
        title: "Prime Checker",
        href: "/Vinod",
        desc: "Check if a number is prime or find all primes in a range.",
      },
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-background">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary tracking-tight">
        Team Projects Dashboard
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-12">
        Explore mini-projects by{" "}
        <span className="font-bold">
          Mursaleen, Aniket, Bishal, Piyush, Tejas, Vinod
        </span>
      </p>

      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-2">
        {projects.map((member) => (
          <Card
            key={member.name}
            className="shadow-lg border-2 border-primary/20 hover:border-primary/60 transition-all"
          >
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="font-bold">{member.name}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {member.tasks.length}{" "}
                  {member.tasks.length > 1 ? "Projects" : "Project"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.tasks.map((task, i) => (
                <div key={task.title}>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {task.title}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {task.desc}
                  </div>
                  <Link href={task.href}>
                    <Button size="sm" variant="outline" className="group">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  {i !== member.tasks.length - 1 && (
                    <Separator className="my-3 opacity-60" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
