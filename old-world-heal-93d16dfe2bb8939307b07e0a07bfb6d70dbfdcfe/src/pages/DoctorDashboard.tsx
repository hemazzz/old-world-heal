import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Users,
  Clock,
  FileText,
  ChevronRight,
  Calendar,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const doctorStats = [
  { title: "Patients Today", value: 8, icon: <Users className="w-5 h-5" />, description: "4 completed" },
  { title: "Next Patient In", value: "5 min", icon: <Clock className="w-5 h-5" />, description: "Mrs. Charlotte Adams" },
  { title: "Prescriptions", value: 12, icon: <FileText className="w-5 h-5" />, description: "Issued today" },
  { title: "Avg. Consultation", value: "18 min", icon: <Activity className="w-5 h-5" />, description: "Per patient" },
];

const waitingPatients = [
  { id: 1, name: "Mrs. Charlotte Adams", age: 45, complaint: "Persistent headaches", waitTime: "5 min", priority: "normal" },
  { id: 2, name: "Mr. William Clarke", age: 62, complaint: "Follow-up: Blood pressure", waitTime: "12 min", priority: "normal" },
  { id: 3, name: "Ms. Sarah Mitchell", age: 28, complaint: "Chest discomfort", waitTime: "3 min", priority: "urgent" },
];

const recentPatients = [
  { id: 1, name: "Mrs. Eleanor Wright", time: "9:00 AM", diagnosis: "Seasonal allergies", status: "Prescription issued" },
  { id: 2, name: "Mr. Theodore Mills", time: "9:30 AM", diagnosis: "Routine check-up", status: "Labs ordered" },
];

export default function DoctorDashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Good Morning, Dr. Harrison"
        description="Your patients await in gentle order, each name calling upon your wisdom; open their records, offer your guidance, and let your chamber's steady calm shape the course of care."
        icon={<Stethoscope className="w-6 h-6" />}
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {doctorStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Waiting Patients */}
        <Card variant="vintage" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Waiting Room
            </CardTitle>
            <Badge variant="secondary">{waitingPatients.length} waiting</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {waitingPatients.map((patient, index) => (
              <div
                key={patient.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 hover:vintage-shadow cursor-pointer animate-slide-in",
                  patient.priority === "urgent" 
                    ? "bg-destructive/5 border-destructive/20" 
                    : "bg-secondary/30 border-transparent"
                )}
                style={{ animationDelay: `${250 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      patient.priority === "urgent" 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-primary/10 text-primary"
                    )}>
                      <span className="font-heading font-semibold">
                        {patient.name.split(" ")[1][0]}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{patient.name}</p>
                        {patient.priority === "urgent" && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.complaint}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Waiting</p>
                    <p className="font-heading font-semibold">{patient.waitTime}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1">
                    Start Consultation
                  </Button>
                  <Button size="sm" variant="outline">
                    View History
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card variant="paper" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 animate-slide-in"
                style={{ animationDelay: `${350 + index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-vintage-sage/30 flex items-center justify-center">
                      <span className="font-heading font-semibold text-vintage-leather">
                        {patient.name.split(" ")[1][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="mt-3 pl-13 space-y-1">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Diagnosis:</span> {patient.diagnosis}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Status:</span> {patient.status}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Note */}
      <Card variant="paper" className="mt-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold">Today's Focus</h3>
              <p className="text-muted-foreground mt-1">
                Remember to follow up on Mrs. Wright's allergy test results and Mr. Mills' lab work by end of day.
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
