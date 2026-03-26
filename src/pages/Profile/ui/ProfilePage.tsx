import { useState } from "react";
import "../styles/ProfilePage.css";
import { useAuthStore } from "@/app/store/useUserStore";
import { supabase } from "@/shared/api/supabase";

export default function ProfilePage() {
  const session = useAuthStore((state) => state.session);
  const user = useAuthStore((state) => state.user);
  const username = useAuthStore((state) => state.username);
  const setSession = useAuthStore((state) => state.setSession);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!session || !user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Chargement des données de profil...</p>
        </div>
      </div>
    );
  }

  const createdAt = new Date(user.created_at);
  const formattedDate = createdAt.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEditUsernameClick = () => {
    setError(null);
    setSuccessMessage(null);
    setEditedUsername(username || "");
    setIsEditingUsername(true);
  };

  const handleCancelUsername = () => {
    setIsEditingUsername(false);
    setEditedUsername(username || "");
    setError(null);
  };

  const handleSaveUsername = async () => {
    if (editedUsername === username) {
      setIsEditingUsername(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          username: editedUsername,
        },
      });

      if (updateError) {
        throw updateError;
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }

      setSuccessMessage("Nom d'utilisateur mis à jour avec succès!");
      setIsEditingUsername(false);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setError(errorMessage);
      console.error("Erreur lors de la mise à jour du username:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="profile-container">
      <div className="profile-card">
        <h1>Mon Profil</h1>

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="profile-info">
          <div className="info-group">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="info-group">
            <label>Nom d'utilisateur</label>
            {isEditingUsername ? (
              <div className="editable-field">
                <input
                  type="text"
                  className="edit-input"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  disabled={isLoading}
                />
                <div className="field-actions">
                  <button
                    className="action-btn save-btn"
                    onClick={handleSaveUsername}
                    disabled={isLoading}
                    title="Enregistrer"
                  >
                    ✓
                  </button>
                  <button
                    className="action-btn cancel-btn"
                    onClick={handleCancelUsername}
                    disabled={isLoading}
                    title="Annuler"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="field-with-icon">
                <p>{username || "Non défini"}</p>
                <button
                  className="edit-icon-btn"
                  onClick={handleEditUsernameClick}
                  disabled={isLoading}
                  title="Éditer"
                >
                  ✎<span>Modifier</span>
                </button>
              </div>
            )}
          </div>

          <div className="info-group">
            <label>Date de création du compte</label>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
