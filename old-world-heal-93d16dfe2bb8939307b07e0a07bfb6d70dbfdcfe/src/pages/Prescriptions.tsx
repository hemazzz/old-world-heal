import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pill, Plus, Printer, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const commonMedications = [
  "Amoxicillin 500mg",
  "Ibuprofen 400mg",
  "Omeprazole 20mg",
  "Metformin 500mg",
  "Lisinopril 10mg",
  "Atorvastatin 20mg",
  "Cetirizine 10mg",
  "Paracetamol 500mg",
];

const dosageFrequencies = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Four times daily",
  "Every 4 hours",
  "Every 6 hours",
  "Every 8 hours",
  "As needed",
];

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function Prescriptions() {
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      { id: Date.now(), name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((m) => m.id !== id));
    }
  };

  const updateMedication = (id: number, field: keyof Medication, value: string) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handlePrint = () => {
    toast({
      title: "Prescription Ready",
      description: "The prescription has been prepared for printing.",
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Prescription"
        description="Prepare the prescription with the thoughtful precision of a seasoned healer, offering clear instructions and measured care, just as generations of physicians have done before."
        icon={<Pill className="w-6 h-6" />}
        actions={
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print Prescription
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient Info */}
        <Card variant="vintage" className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient Name</Label>
              <Input
                id="patient"
                placeholder="Mrs. Eleanor Wright"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Seasonal allergies with mild rhinitis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                rows={3}
              />
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Prescription Date</p>
              <p className="font-heading font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card variant="paper" className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Medications</CardTitle>
            <Button onClick={addMedication} variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Medication
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {medications.map((medication, index) => (
              <div
                key={medication.id}
                className="p-4 rounded-lg border bg-card animate-fade-in"
                style={{ animationDelay: `${150 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Medication {index + 1}
                  </span>
                  {medications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeMedication(medication.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Medication Name</Label>
                    <Select
                      value={medication.name}
                      onValueChange={(value) => updateMedication(medication.id, "name", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select medication" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonMedications.map((med) => (
                          <SelectItem key={med} value={med}>
                            {med}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Custom Dosage</Label>
                    <Input
                      placeholder="e.g., 1 tablet"
                      value={medication.dosage}
                      onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select
                      value={medication.frequency}
                      onValueChange={(value) => updateMedication(medication.id, "frequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {dosageFrequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., 7 days"
                      value={medication.duration}
                      onChange={(e) => updateMedication(medication.id, "duration", e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Special Instructions</Label>
                  <Input
                    placeholder="e.g., Take with food, avoid alcohol"
                    value={medication.instructions}
                    onChange={(e) => updateMedication(medication.id, "instructions", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Notes */}
      <Card variant="vintage" className="mt-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle>Additional Notes & Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="General advice for the patient: rest, hydration, follow-up instructions, lifestyle recommendations..."
            rows={4}
          />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
