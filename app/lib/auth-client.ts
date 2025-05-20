import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

// // Get the API URL from environment variables
const AUTH_API_URL =
  "http://localhost:7300" // Fallback URL for development

export const authClient = createAuthClient({
  baseURL: AUTH_API_URL,
  basePath: "/api/auth",
  plugins: [
    usernameClient()
  ],
})
