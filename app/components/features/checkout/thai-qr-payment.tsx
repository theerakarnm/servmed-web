import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface ThaiQRPaymentProps {
  amount: number
  onPaymentConfirmed: () => void
}

export default function ThaiQRPayment({ amount, onPaymentConfirmed }: ThaiQRPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isQRGenerated, setIsQRGenerated] = useState(false)

  // In a real app, this would be generated on the server
  const qrCodeUrl = "/placeholder.svg?height=300&width=300&text=Thai+QR+Payment"

  const handleGenerateQR = () => {
    setIsLoading(true)
    // Simulate API call to generate QR code
    setTimeout(() => {
      setIsLoading(false)
      setIsQRGenerated(true)
    }, 1500)
  }

  if (!isQRGenerated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thai QR Payment</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Click the button below to generate a QR code for payment.</p>
          <Button onClick={handleGenerateQR} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating QR Code...
              </>
            ) : (
              "Generate QR Code"
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thai QR Payment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative h-64 w-64 mb-4">
          <img src={qrCodeUrl || "/placeholder.svg"} alt="Thai QR Payment Code" className="object-contain" />
        </div>

        <div className="text-center mb-4">
          <p className="font-bold text-lg">Amount: ${amount.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Scan this QR code with your banking app to complete payment</p>
        </div>

        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>Please do not close this page until you have completed the payment.</AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onPaymentConfirmed}>
          <CheckCircle className="mr-2 h-4 w-4" />I have completed the payment
        </Button>
      </CardFooter>
    </Card>
  )
}
