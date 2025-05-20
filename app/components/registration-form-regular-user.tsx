import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

// 👇 your shared auth helper
import { authClient } from "~/lib/auth-client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

// ---------- utilities ----------
function validateEmail(email: string) {
  return email.includes("@") ? undefined : "Email is invalid";
}

function validatePassword(password: string) {
  return password.length >= 8 ? undefined : "Password must be ≥ 8 characters";
}

function validateName(name: string) {
  return name.trim() ? undefined : "Name is required";
}

// ---------- types ----------
interface ActionData {
  formError?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
    name?: string;
  };
  fields?: {
    email?: string;
    name?: string;
  };
}

// ---------- action ----------
// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const name = String(formData.get("name") || "");

//   const fieldErrors = {
//     email: validateEmail(email),
//     password: validatePassword(password),
//     name: validateName(name),
//   };

//   if (Object.values(fieldErrors).some(Boolean)) {
//     return json<ActionData>(
//       { fieldErrors, fields: { email, name } },
//       { status: 400 }
//     );
//   }

//   try {
//     await authClient.register({ email, password, name });
//     return redirect("/login?registered=1");
//   } catch (err) {
//     const message = err instanceof Error ? err.message : "Registration failed";
//     return json<ActionData>({ formError: message, fields: { email, name } }, { status: 400 });
//   }
// }

// ---------- UI ----------
export function RegisterRegularUserForm() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">Create an account</h1>

      <Form method="post" className="space-y-5" replace>
        <div>
          <Label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={actionData?.fields?.name}
            className="w-full rounded border p-2"
          />
          {actionData?.fieldErrors?.name && (
            <p className="text-sm text-red-600">{actionData.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={actionData?.fields?.email}
            className="w-full rounded border p-2"
          />
          {actionData?.fieldErrors?.email && (
            <p className="text-sm text-red-600">{actionData.fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="w-full rounded border p-2"
          />
          {actionData?.fieldErrors?.password && (
            <p className="text-sm text-red-600">{actionData.fieldErrors.password}</p>
          )}
        </div>

        {actionData?.formError && (
          <p className="text-sm text-red-600">{actionData.formError}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Sign up"}
        </Button>
      </Form>
    </div>
  );
}

export function meta() {
  return [{ title: "Register" }];
}
