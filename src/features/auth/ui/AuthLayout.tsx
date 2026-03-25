import logoSrc from "@/assets/logo_pintail.svg";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="login-container">
      {/* Form Section */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Image Placeholder Section */}
      <div className="login-image-section">
        <div className="image-placeholder">
          <img src={logoSrc} alt="Pintail Logo" className="logo-image" />
        </div>
      </div>
    </div>
  );
}
