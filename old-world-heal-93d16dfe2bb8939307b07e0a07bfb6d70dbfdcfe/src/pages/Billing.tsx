import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Receipt,
  CreditCard,
  Banknote,
  Plus,
  Trash2,
  Printer,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const services = [
  { id: "consultation", name: "General Consultation", price: 75 },
  { id: "checkup", name: "Complete Check-up", price: 150 },
  { id: "followup", name: "Follow-up Visit", price: 50 },
  { id: "labwork", name: "Laboratory Work", price: 120 },
  { id: "xray", name: "X-Ray", price: 200 },
  { id: "prescription", name: "Prescription", price: 25 },
  { id: "injection", name: "Injection/Vaccination", price: 45 },
];

interface InvoiceItem {
  id: number;
  service: string;
  quantity: number;
  price: number;
}

const recentInvoices = [
  { id: "INV-001", patient: "Mrs. Eleanor Wright", date: "Dec 5, 2024", amount: 125, status: "paid" },
  { id: "INV-002", patient: "Mr. Theodore Mills", date: "Dec 5, 2024", amount: 270, status: "pending" },
  { id: "INV-003", patient: "Ms. Charlotte Adams", date: "Dec 3, 2024", amount: 75, status: "paid" },
];

export default function Billing() {
  const [patientName, setPatientName] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, service: "", quantity: 1, price: 0 },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    setItems([...items, { id: Date.now(), service: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (field === "service") {
            const service = services.find((s) => s.id === value);
            return { ...item, service: value as string, price: service?.price || 0 };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleSubmit = () => {
    toast({
      title: "Invoice Created",
      description: `Invoice for ${patientName} totaling $${total.toFixed(2)} has been created.`,
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Billing & Payment"
        description="Settle the dues with fairness and simplicity, recording each charge as one would in a trusted account book, bringing the visit to an orderly and honest close."
        icon={<Receipt className="w-6 h-6" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invoice Form */}
        <Card variant="vintage" className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle>Create Invoice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient */}
            <div className="space-y-2">
              <Label>Patient Name</Label>
              <Input
                placeholder="Mrs. Eleanor Wright"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>

            {/* Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Services</Label>
                <Button onClick={addItem} variant="outline" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-end gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1 space-y-2">
                    <Select
                      value={item.service}
                      onValueChange={(value) => updateItem(item.id, "service", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-20 space-y-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="w-24 text-right">
                    <p className="font-heading font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Discount */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Totals */}
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-vintage-sage">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-heading text-xl font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleSubmit} className="flex-1 gap-2">
                <Check className="w-4 h-4" />
                Complete Payment
              </Button>
              <Button variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Print Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card variant="paper" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentInvoices.map((invoice, index) => (
              <div
                key={invoice.id}
                className="p-4 rounded-lg bg-secondary/30 animate-slide-in"
                style={{ animationDelay: `${150 + index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{invoice.patient}</p>
                    <p className="text-xs text-muted-foreground">{invoice.id}</p>
                  </div>
                  <Badge
                    variant={invoice.status === "paid" ? "default" : "secondary"}
                    className={cn(
                      invoice.status === "paid"
                        ? "bg-primary/10 text-primary"
                        : "bg-vintage-gold/20 text-vintage-leather"
                    )}
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{invoice.date}</span>
                  <span className="font-heading font-semibold">${invoice.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Info */}
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <Card variant="vintage" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardContent className="py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Banknote className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Cash Payments</p>
              <p className="text-sm text-muted-foreground">Accepted at front desk</p>
            </div>
          </CardContent>
        </Card>
        <Card variant="vintage" className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <CardContent className="py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Card Payments</p>
              <p className="text-sm text-muted-foreground">All major cards accepted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
