import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
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
import { Calendar, Clock, User, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const doctors = [
  { id: "1", name: "Dr. Henry Harrison", specialty: "General Medicine" },
  { id: "2", name: "Dr. Margaret Bennett", specialty: "Pediatrics" },
  { id: "3", name: "Dr. Robert Clarke", specialty: "Orthopedics" },
  { id: "4", name: "Dr. Elizabeth Moore", specialty: "Cardiology" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const appointmentTypes = [
  "General Check-up",
  "Follow-up Visit",
  "Consultation",
  "Emergency",
  "Routine Examination",
];

const todaysAppointments = [
  { id: 1, patient: "Mrs. Eleanor Wright", time: "9:00 AM", doctor: "Dr. Harrison", type: "Check-up", status: "completed" },
  { id: 2, patient: "Mr. Theodore Mills", time: "9:30 AM", doctor: "Dr. Harrison", type: "Follow-up", status: "in-progress" },
  { id: 3, patient: "Ms. Charlotte Adams", time: "10:00 AM", doctor: "Dr. Bennett", type: "Consultation", status: "waiting" },
  { id: 4, patient: "Mr. William Clarke", time: "10:30 AM", doctor: "Dr. Harrison", type: "Check-up", status: "scheduled" },
  { id: 5, patient: "Mrs. Victoria Hayes", time: "11:00 AM", doctor: "Dr. Moore", type: "Follow-up", status: "scheduled" },
];

export default function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const handleBook = () => {
    if (!patientName || !selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Appointment Booked",
      description: `Appointment scheduled for ${patientName} on ${selectedDate} at ${selectedTime}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-primary/10 text-primary";
      case "in-progress": return "bg-vintage-gold/20 text-vintage-leather";
      case "waiting": return "bg-vintage-rose/20 text-vintage-leather";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Appointment Booking"
        description="Choose a doctor and select a time, much like marking a name in a well-kept ledger, ensuring each appointment finds its rightful place in the day's peaceful rhythm."
        icon={<Calendar className="w-6 h-6" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Booking Form */}
        <Card variant="vintage" className="lg:col-span-1 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Book New Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="patient"
                  placeholder="Search or enter patient name"
                  className="pl-10"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a physician" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div>
                        <div>{doctor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doctor.specialty}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time Slot</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleBook} className="w-full mt-4 gap-2">
              <Clock className="w-4 h-4" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card variant="paper" className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysAppointments.map((apt, index) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 animate-slide-in"
                  style={{ animationDelay: `${150 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading text-lg font-semibold text-primary">
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
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize",
                      getStatusColor(apt.status)
                    )}>
                      {apt.status.replace("-", " ")}
                    </span>
                    <div className="text-right">
                      <p className="font-heading font-semibold">{apt.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
