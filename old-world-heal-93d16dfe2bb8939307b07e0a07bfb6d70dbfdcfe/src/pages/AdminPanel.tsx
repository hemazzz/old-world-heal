import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Users,
  Stethoscope,
  TrendingUp,
  Calendar,
  FileText,
  DollarSign,
  Activity,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminStats = [
  { title: "Total Patients", value: "1,247", icon: <Users className="w-5 h-5" />, description: "+48 this month", trend: { value: 12, positive: true } },
  { title: "Active Doctors", value: 8, icon: <Stethoscope className="w-5 h-5" />, description: "All on duty" },
  { title: "Monthly Revenue", value: "$45,230", icon: <DollarSign className="w-5 h-5" />, description: "December 2024", trend: { value: 8, positive: true } },
  { title: "Appointments", value: 342, icon: <Calendar className="w-5 h-5" />, description: "This month", trend: { value: 5, positive: true } },
];

const doctors = [
  { id: 1, name: "Dr. Henry Harrison", specialty: "General Medicine", patients: 156, status: "available" },
  { id: 2, name: "Dr. Margaret Bennett", specialty: "Pediatrics", patients: 124, status: "busy" },
  { id: 3, name: "Dr. Robert Clarke", specialty: "Orthopedics", patients: 98, status: "available" },
  { id: 4, name: "Dr. Elizabeth Moore", specialty: "Cardiology", patients: 112, status: "away" },
];

const recentActivities = [
  { id: 1, action: "New patient registered", user: "Reception", time: "5 minutes ago" },
  { id: 2, action: "Appointment completed", user: "Dr. Harrison", time: "12 minutes ago" },
  { id: 3, action: "Invoice paid", user: "Billing Dept", time: "25 minutes ago" },
  { id: 4, action: "Lab results uploaded", user: "Lab Tech", time: "1 hour ago" },
  { id: 5, action: "Prescription issued", user: "Dr. Bennett", time: "2 hours ago" },
];

const weeklyData = [
  { day: "Mon", patients: 32, revenue: 2400 },
  { day: "Tue", patients: 45, revenue: 3200 },
  { day: "Wed", patients: 28, revenue: 2100 },
  { day: "Thu", patients: 52, revenue: 3800 },
  { day: "Fri", patients: 38, revenue: 2900 },
  { day: "Sat", patients: 22, revenue: 1600 },
  { day: "Sun", patients: 8, revenue: 600 },
];

export default function AdminPanel() {
  const maxPatients = Math.max(...weeklyData.map((d) => d.patients));

  return (
    <MainLayout>
      <PageHeader
        title="Admin Panel"
        description="Oversee the clinic's workings from this quiet command desk, managing staff, doctors, reports, and records with the same steady discipline that has long kept a clinic's heart beating smoothly."
        icon={<Settings className="w-6 h-6" />}
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {adminStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Chart */}
            <Card variant="paper" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Weekly Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-48">
                  {weeklyData.map((data, index) => (
                    <div
                      key={data.day}
                      className="flex-1 flex flex-col items-center gap-2 animate-fade-in"
                      style={{ animationDelay: `${250 + index * 50}ms` }}
                    >
                      <div
                        className="w-full bg-primary/20 rounded-t-md transition-all duration-500 hover:bg-primary/30"
                        style={{
                          height: `${(data.patients / maxPatients) * 100}%`,
                          minHeight: "8px",
                        }}
                      >
                        <div
                          className="w-full bg-primary rounded-t-md transition-all duration-700"
                          style={{
                            height: "100%",
                            opacity: 0.8,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{data.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="vintage" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 animate-slide-in"
                    style={{ animationDelay: `${350 + index * 50}ms` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card variant="paper" className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medical Staff</CardTitle>
              <Button variant="outline" size="sm">
                Add Doctor
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doctors.map((doctor, index) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 animate-slide-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{doctor.patients} patients</p>
                        <p className="text-xs text-muted-foreground">Active cases</p>
                      </div>
                      <Badge
                        className={cn(
                          doctor.status === "available" && "bg-primary/10 text-primary",
                          doctor.status === "busy" && "bg-vintage-gold/20 text-vintage-leather",
                          doctor.status === "away" && "bg-muted text-muted-foreground"
                        )}
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Patient Report", description: "Complete patient statistics", icon: Users },
              { title: "Financial Report", description: "Revenue and billing summary", icon: DollarSign },
              { title: "Appointment Report", description: "Scheduling analytics", icon: Calendar },
              { title: "Prescription Report", description: "Medication statistics", icon: FileText },
              { title: "Staff Performance", description: "Doctor & staff metrics", icon: TrendingUp },
              { title: "Inventory Report", description: "Medical supplies status", icon: Activity },
            ].map((report, index) => (
              <Card
                key={report.title}
                variant="vintage"
                className="cursor-pointer hover:vintage-shadow-lg transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <report.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      <Button variant="link" className="px-0 mt-2 h-auto">
                        Generate Report →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
