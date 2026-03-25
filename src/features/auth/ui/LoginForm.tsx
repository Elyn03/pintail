import { useLogin } from "@/features/auth/model/useLogin";
import { loginSchema } from "@/entities/user/model/login-schema";
import FormField from "./FormField";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const { mutate } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const parsed = loginSchema.safeParse(data);

    if (!parsed.success) return;

    mutate(parsed.data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="login-form">
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

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="login-button">
          Sign in
        </button>
      </form>

      <div className="login-footer">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
