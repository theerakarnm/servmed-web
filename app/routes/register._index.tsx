import RegistrationForm from "~/components/registration-form";
import { RegisterRegularUserForm } from "~/components/registration-form-regular-user";
import { useSearchParams } from '@remix-run/react';

export default function RegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <img src="/ServeMedLogo.avif" alt="ServeMed Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary">สมัครสมาชิกสำหรับ {searchParams.get('business') ? 'สถานประกอบการ' : 'บุคคลทั่วไป'}</h1>
        </div>
        {
          searchParams.get('business') ? (
            <RegistrationForm />
          ) : (
            <RegisterRegularUserForm />
          )
        }
      </div>
    </main>
  )
}

