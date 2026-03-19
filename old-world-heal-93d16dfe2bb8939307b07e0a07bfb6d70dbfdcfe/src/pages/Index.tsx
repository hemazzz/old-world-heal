import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Patients Today",
    value: 24,
    icon: <Users className="w-5 h-5" />,
    description: "Registered for today",
    trend: { value: 12, positive: true },
  },
  {
    title: "Appointments",
    value: 18,
    icon: <Calendar className="w-5 h-5" />,
    description: "Scheduled visits",
    trend: { value: 8, positive: true },
  },
  {
    title: "Prescriptions",
    value: 42,
    icon: <FileText className="w-5 h-5" />,
    description: "Issued this week",
    trend: { value: 5, positive: false },
  },
  {
    title: "Avg. Wait Time",
    value: "12 min",
    icon: <Clock className="w-5 h-5" />,
    description: "Current average",
    trend: { value: 15, positive: true },
  },
];

const upcomingAppointments = [
  { id: 1, patient: "Mrs. Eleanor Wright", time: "9:00 AM", doctor: "Dr. Harrison", type: "Check-up" },
  { id: 2, patient: "Mr. Theodore Mills", time: "9:30 AM", doctor: "Dr. Harrison", type: "Follow-up" },
  { id: 3, patient: "Ms. Charlotte Adams", time: "10:00 AM", doctor: "Dr. Bennett", type: "Consultation" },
  { id: 4, patient: "Mr. William Clarke", time: "10:30 AM", doctor: "Dr. Harrison", type: "Check-up" },
];

const quickActions = [
  { label: "Register Patient", href: "/patients/register", icon: Users },
  { label: "Book Appointment", href: "/appointments", icon: Calendar },
  { label: "View Records", href: "/records", icon: FileText },
  { label: "Analytics", href: "/admin", icon: TrendingUp },
];

export default function Index() {
  return (
    <MainLayout>
      <PageHeader
        title="Welcome to the Clinic Desk"
        description="Where each day begins with calm purpose, and every task echoes the gentle order of the old registers—appointments arranged neatly, records preserved with respect, and the steady work of healing carried out with quiet dedication."
        icon={<Home className="w-6 h-6" />}
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Appointments */}
        <Card variant="paper" className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Today's Appointments</CardTitle>
            <Link to="/appointments">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200 animate-slide-in"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading text-sm font-semibold text-primary">
                        {apt.patient.split(" ")[1][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{apt.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {apt.type} • {apt.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-semibold text-primary">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="vintage" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Link key={action.label} to={action.href}>
                <Button
                  variant="secondary"
                  className="w-full justify-start gap-3 h-12 animate-slide-in"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Inspirational Quote */}
      <Card variant="paper" className="mt-8 animate-fade-in" style={{ animationDelay: "500ms" }}>
        <CardContent className="py-8 text-center">
          <blockquote className="font-heading text-xl italic text-muted-foreground max-w-2xl mx-auto">
            "The good physician treats the disease; the great physician treats the patient who has the disease."
          </blockquote>
          <cite className="mt-4 block text-sm text-muted-foreground">
            — Sir William Osler
          </cite>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
