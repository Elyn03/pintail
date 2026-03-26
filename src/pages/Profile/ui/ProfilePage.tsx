import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ProfileWidget } from "@/widgets/profile";

function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#FAECE7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          ⚠️
        </div>
        <h2>Une erreur est survenue</h2>
        <p style={{ color: "var(--dark-grey)", margin: "0.5rem 0 1.5rem" }}>
          Impossible de charger cette section. Réessayez ou revenez à l'accueil.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button
            onClick={resetErrorBoundary}
            style={{
              background: "var(--primary-color)",
              color: "var(--white)",
            }}
          >
            Réessayer
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              color: "var(--dark-grey)",
              border: "1px solid var(--dark-grey)",
            }}
          >
            Retour accueil
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSuspenseFallback() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <p>Chargement du profil...</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ProfileSuspenseFallback />}>
        <ProfileWidget />
      </Suspense>
    </ErrorBoundary>
  );
}
