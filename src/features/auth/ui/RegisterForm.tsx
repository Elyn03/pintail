import { useRegister } from "@/features/auth/model/useRegister";
import { registrationData } from "@/entities/user/model/registration-schema";
import FormField from "../../../shared/components/ui/FormField.tsx";
import AuthLayout from "./AuthLayout";

export default function RegisterForm() {
  const { mutate } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const parsed = registrationData.safeParse(data);

    if (!parsed.success) return;

    mutate({
      email: parsed.data.email,
      password: parsed.data.password,
      username: parsed.data.username,
    });
  };

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to get started">
      <form onSubmit={handleSubmit} className="login-form">
        <FormField
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="john_doe"
          required
        />

        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <button type="submit" className="login-button">
          Sign up
        </button>
      </form>

      <div className="login-footer">
        <p>
          Already have an account?{" "}
          <a href="/login" className="signup-link">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
