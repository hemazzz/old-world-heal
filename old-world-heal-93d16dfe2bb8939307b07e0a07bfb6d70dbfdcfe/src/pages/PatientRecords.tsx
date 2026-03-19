import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  Pill,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const patients = [
  {
    id: 1,
    name: "Mrs. Eleanor Wright",
    age: 52,
    gender: "Female",
    lastVisit: "Dec 5, 2024",
    condition: "Seasonal Allergies",
    visits: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Mr. Theodore Mills",
    age: 67,
    gender: "Male",
    lastVisit: "Dec 5, 2024",
    condition: "Hypertension",
    visits: 12,
    status: "active",
  },
  {
    id: 3,
    name: "Ms. Charlotte Adams",
    age: 45,
    gender: "Female",
    lastVisit: "Dec 3, 2024",
    condition: "Migraine",
    visits: 5,
    status: "active",
  },
  {
    id: 4,
    name: "Mr. William Clarke",
    age: 62,
    gender: "Male",
    lastVisit: "Nov 28, 2024",
    condition: "Arthritis",
    visits: 15,
    status: "inactive",
  },
  {
    id: 5,
    name: "Mrs. Victoria Hayes",
    age: 38,
    gender: "Female",
    lastVisit: "Nov 25, 2024",
    condition: "Diabetes Type 2",
    visits: 20,
    status: "active",
  },
];

const selectedPatientHistory = [
  { date: "Dec 5, 2024", type: "Check-up", doctor: "Dr. Harrison", notes: "Seasonal allergies flare-up. Prescribed antihistamines." },
  { date: "Oct 15, 2024", type: "Follow-up", doctor: "Dr. Harrison", notes: "Symptoms improved. Continue current medication." },
  { date: "Aug 20, 2024", type: "Consultation", doctor: "Dr. Bennett", notes: "Initial allergy assessment. Recommended lifestyle changes." },
];

export default function PatientRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <PageHeader
        title="Patient Records"
        description="Here rests the patient's history, preserved like pages of an old clinic journal—visits, symptoms, treatments, and notes gathered with dignity, ready to guide the next step in their healing."
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient List */}
        <Card variant="vintage" className="lg:col-span-1 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-all duration-200 animate-slide-in",
                  selectedPatient.id === patient.id
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/30 hover:bg-secondary/50"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-semibold text-primary">
                        {patient.name.split(" ")[1][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card variant="paper" className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.visits} visits
                </p>
              </div>
              <Badge variant={selectedPatient.status === "active" ? "default" : "secondary"}>
                {selectedPatient.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Quick Info */}
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Last Visit</span>
                </div>
                <p className="font-heading font-semibold">{selectedPatient.lastVisit}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">Primary Condition</span>
                </div>
                <p className="font-heading font-semibold">{selectedPatient.condition}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Pill className="w-4 h-4" />
                  <span className="text-sm">Active Prescriptions</span>
                </div>
                <p className="font-heading font-semibold">2 medications</p>
              </div>
            </div>

            {/* Visit History */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Visit History</h3>
              <div className="space-y-4">
                {selectedPatientHistory.map((visit, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border bg-card animate-slide-in"
                    style={{ animationDelay: `${200 + index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{visit.type}</p>
                        <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{visit.date}</span>
                    </div>
                    <p className="text-sm">{visit.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                Add Note
              </Button>
              <Button variant="outline" className="gap-2">
                <Pill className="w-4 h-4" />
                New Prescription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
