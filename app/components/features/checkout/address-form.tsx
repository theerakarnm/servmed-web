import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"
import { toast } from 'sonner'

export type Address = {
  id: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

interface AddressFormProps {
  existingAddress?: Address
  onSave: (address: Address) => void | Promise<void>
  onCancel?: () => void
}

export default function AddressForm({ existingAddress, onSave, onCancel }: AddressFormProps) {
  const [address, setAddress] = useState<Partial<Address>>(
    existingAddress || {
      isDefault: true,
    },
  )

  useEffect(() => {
    if (existingAddress) {
      setAddress(existingAddress)
    }
  }, [existingAddress])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setAddress((prev) => ({ ...prev, isDefault: checked }))
  }

  const handleSubmit = (
    e?: React.FormEvent | React.MouseEvent,
  ) => {
    e?.preventDefault()
    e?.stopPropagation()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "address", "city", "state", "postalCode", "country", "phone"]
    const missingFields = requiredFields.filter((field) => !address[field as keyof typeof address])

    if (missingFields.length > 0) {
      toast(`Please fill in all required fields: ${missingFields.join(", ")}`)
      return
    }

    // Create a new address with an ID if it doesn't exist
    const completeAddress = {
      ...address,
      id: existingAddress?.id || `address_${Date.now()}`,
    } as Address

    void onSave(completeAddress)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{existingAddress ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input id="firstName" name="firstName" value={address.firstName || ""} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input id="lastName" name="lastName" value={address.lastName || ""} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address*</Label>
            <Input id="address" name="address" value={address.address || ""} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City*</Label>
            <Input id="city" name="city" value={address.city || ""} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State/Province*</Label>
              <Input id="state" name="state" value={address.state || ""} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code*</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={address.postalCode || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country*</Label>
            <Input id="country" name="country" value={address.country || ""} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input id="phone" name="phone" type="tel" value={address.phone || ""} onChange={handleChange} required />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isDefault" checked={address.isDefault} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="isDefault">Set as default shipping address</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="button" onClick={handleSubmit}>Save Address</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
