import { useState } from "react";
import { redirect, useNavigation, useSearchParams, useSubmit } from "@remix-run/react";
import Wrapper from "~/layouts/Wrapper";
import FileUpload from "~/components/file-upload";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "sonner";
import { jnavigate } from "~/lib/utils";
import { useCart } from "~/context/cart-context";
import { fileUpload } from "~/lib/upload-file";
import { ActionFunctionArgs } from "@remix-run/node";
import { checkoutOrder } from "~/services/checkout";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = formData.get("orderData");
  if (!rawData || typeof rawData !== "string") {
    return Response.json({ ok: false, message: "Missing order data" }, { status: 400 });
  }

  try {
    const order = JSON.parse(rawData);
    await checkoutOrder(order);
    return redirect("/");
  } catch (error) {
    console.error("Checkout failed:", error);
    return Response.json({ ok: false, message: "Checkout failed" }, { status: 500 });
  }
}

export default function UploadSlipPage() {
  const [slip, setSlip] = useState<File | null>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const { clearCart } = useCart();
  const submit = useSubmit()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slip) {
      toast("Please upload your payment slip.");
      return;
    }

    try {
      const imageObject = await fileUpload(slip)

      if (!imageObject.success) {
        throw new Error(imageObject.message);
      }

      const savedOrders = localStorage.getItem("orders") || "[]";
      const orders = JSON.parse(savedOrders)
      const orderIndex = orders.findIndex((order: any) => order.id === orderId);

      if (orderIndex === -1) {
        throw new Error("Order not found");
      }
      orders[orderIndex].paymentSlip = imageObject.file.url;

      const formData = new FormData();
      formData.append("orderData", JSON.stringify(orders[orderIndex]));

      submit(formData, {
        action: '/upload-slip',
        method: 'post',
        navigate: false,
      })
        
      clearCart();
   
    } catch (error) {
      console.error("Upload failed:", error);
      toast("Failed to upload payment slip. Please try again.");
    }
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