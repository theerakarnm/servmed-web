import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import Wrapper from "~/layouts/Wrapper";
import FileUpload from "~/components/file-upload";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";
import { jnavigate } from "~/lib/utils";

export default function UploadSlipPage() {
  const [slip, setSlip] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slip) {
      toast("Please upload your payment slip.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Payment slip uploaded. We'll verify your transfer shortly.");
      jnavigate({ path: "/" });
    }, 1500);
  };

  return (
    <Wrapper>
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Upload Payment Slip</CardTitle>
            {orderId && (
              <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FileUpload
                id="slip"
                accept="image/*"
                value={slip}
                onChange={setSlip}
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Slip"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
}
