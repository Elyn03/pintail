# Pintail - SaaS de Gestion de Voyages

Une application web moderne pour planifier, organiser et gérer vos voyages avec vos amis. Pintail offre un système complet de gestion de trips avec authentification, favoris, et collaboration en temps réel.

## Déploiement en Production

**URL de production:** https://pintail.vercel.app/

## Sommaire

- [Stack Technique](#stack-technique)
- [Architecture FSD](#architecture-fsd)
- [Installation](#installation)
- [Commandes Disponibles](#commandes-disponibles)
- [Fonctionnalités](#fonctionnalités)
- [Choix Architecturaux](#choix-architecturaux-détaillés)

---

## Stack Technique

### Frontend

- **Vite** - Bundler et dev server ultra-rapide
- **React 18** - UI framework
- **TypeScript** - Typage strict (mode `strict: true`)
- **React Router** - Routing côté client
- **Zustand** - State management minimaliste et performant
- **React Query (TanStack Query)** - Data fetching et caching
- **Zod** - Validation runtime et schémas TypeScript-first
- **React Hook Form** - Gestion de formulaires performante
- **Vitest + React Testing Library** - Tests unitaires et de composants

### Backend

- **Supabase** - BaaS avec PostgreSQL, Auth, et Realtime
- **PostgREST API** - API RESTful auto-générée

### Autres

- **CSS Modules** - Scoping CSS sans dépendances
- **ESLint** - Linting du code

### Justification des Choix

**Vite vs Next.js:** Vite a été choisi car ce projet n'a pas besoin de SSR (rendu serveur). L'application est une SPA classique sans exigences SEO critiques. Vite offre une meilleure DX et des builds plus rapides sur un projet de cette taille.

**Zustand vs Redux/Context:** Zustand est plus léger que Redux, sans boilerplate excessif. Pour la gestion d'état locale (user, trips), c'est suffisant et plus maintenable.

**Supabase:** Backend simplifié qui nous permet de nous concentrer sur le frontend. Auth intégrée, CRUD auto-généré, et facile à mettre en place localement.

---

## Architecture FSD (Feature Sliced Design)

Le projet suit strictement le Feature Sliced Design avec respect des dépendances unidirectionnelles.

```
src/
├── app/                    # Couche application
│   ├── App.tsx            # Composant root
│   ├── router.tsx         # Configuration des routes
│   ├── components/        # Composants globaux d'app
│   ├── providers/         # Context providers
│   └── store/            # Stores Zustand partagés
│
├── pages/                  # Couche pages (vues complètes)
│   ├── Home/             # Page d'accueil
│   ├── Login/            # Pages d'authentification
│   ├── Profile/          # Profil utilisateur
│   ├── Trip/             # Détail d'un voyage
│   ├── CreateTripForm/   # Création de voyage
│   ├── EditTripForm/     # Édition de voyage
│   └── Calendar/         # Calendrier des trips
│
├── widgets/                # Couche widgets (composants métier composés)
│   ├── header/           # En-tête principal
│   ├── auth/             # Widget d'authentification
│   ├── trip-list/        # Liste de voyages
│   ├── trip-form-card/   # Carte de formulaire
│   ├── calendar-widget/  # Widget calendrier
│   ├── profile/          # Widget profil
│   └── home-info-sidebar # Barre latérale d'info
│
├── features/               # Couche features (slices métier)
│   ├── auth/             # Authentification
│   │   ├── api/          # Endpoints auth
│   │   ├── model/        # Hooks (useLogin, useLogout, useRegister)
│   │   ├── ui/           # Composants (LoginForm, RegisterForm)
│   │   └── index.ts      # Export public
│   └── add-to-fav/       # Ajouter aux favoris
│       ├── ui/
│       └── index.ts
│
├── entities/               # Couche entities (domaine métier)
│   ├── trip/             # Entité voyage
│   │   ├── types.ts      # Types TypeScript
│   │   ├── trip-schema.ts # Zod schemas
│   │   ├── model/        # Logique métier (useFavorites)
│   │   ├── ui/           # Composants (TripCard)
│   │   └── index.ts      # Export public
│   ├── user/             # Entité utilisateur
│   ├── product/          # Entité produit
│   └── cart/             # Entité panier
│
├── shared/                 # Couche partagée (utilities)
│   ├── api/              # Configuration Supabase, queries
│   │   ├── supabase.ts   # Client Supabase
│   │   ├── queryKeys.ts  # Query keys pour React Query
│   │   ├── queries.ts    # Hooks React Query
│   │   └── tripsApi.ts   # API trips
│   └── components/       # Composants réutilisables
│       └── ui/           # CustomButton, FormField, Modal
│
└── assets/                 # Ressources statiques
```

### Règles FSD Respectées

**Chaque slice expose un `index.ts`** - API publique contrôlée
**Dépendances unidirectionnelles** - Les couches hautes ne peuvent importer des couches basses qu'à travers `/index.ts`
**Segments cohérents** - `ui/`, `model/`, `api/`, `types.ts`
**Pas de traversée de couches** - Pas d'import direct depuis shared vers pages/widgets

---

## Installation

### Prérequis

- **Node.js** 18+ et npm
- Un compte Supabase avec une base de données configurée

### Étapes d'Installation

1. **Clone le repository**

   ```bash
   git clone https://github.com/ton-username/pintail.git
   cd pintail
   ```

2. **Installe les dépendances**

   ```bash
   npm install
   ```

3. **Configure les variables d'environnement**

   Crée un fichier `.env.local` à la racine du projet :

   ```env
   VITE_SUPABASE_URL=https://ton-project.supabase.co
   VITE_SUPABASE_ANON_KEY=ton-anonymous-key
   ```

   → Ajoute Supabase à ton projet dans le [Dashboard Supabase](https://app.supabase.com)

4. **Tourne les migrations Supabase**

   ```bash
   # Les migrations sont dans /supabase/migrations/
   # Elles s'appliquent automatiquement avec le dashboard Supabase
   ```

5. **Lance le serveur de développement**

   ```bash
   npm run dev
   ```

   L'app sera accessible sur `http://localhost:5173`

---

## Commandes Disponibles

```bash
# Serveur de développement
npm run dev

# Build production
npm run build

# Aperçu du build
npm run preview

# Linting
npm run lint

# Tests
npm run test          # Lancer tous les tests
npm run test:ui       # Interface UI pour les tests
npm run test:coverage # Rapport de couverture
```

---

## Fonctionnalités

### Authentification

- **Inscription** - Créer un compte avec email/password
- **Connexion** - Se connecter avec email/password
- **Déconnexion** - Déconnexion sécurisée
- **Protection des routes** - ProtectedRoute RBAC
- **Persistance de session** - Stockée dans Zustand avec middleware persist

### Dashboard Utilisateur

- **Page Accueil** - Vue d'ensemble des trips à venir
- **Profil** - Modification des informations personnelles
- **Statistiques** - Nombre de trips, favoris, etc.

### CRUD Complet sur Trips

- **Créer** - Formulaire de création de voyage
- **Lire** - Liste des trips + détail d'un trip
- **Modifier** - Édition de voyage avec validation
- **Supprimer** - Suppression avec confirmation

### Interactions Distantes

- **Ajouter aux Favoris** - Toggle un trip en favori (sync serveur)
- **Synchronisation Réelle** - Cache React Query invalidé après une action

### Filtres et Recherche

- **Filtrage par Date** - Calendrier interactif
- **Filtrage par Status** - Trips à venir, passés, favoris
- **Persistent State** - URL et Zustand synchronisés

### Paramètres/Profil

- **Modification Profil** - Email, nom, prénom, avatar
- **Préférences** - Email notifications, thème (préparé)
- **Sauvegarde Persistante** - Zustand + Supabase

---

## Tests

Le projet inclut une suite de tests avec **Vitest** et **React Testing Library**.

### Exemples de Tests Implémentés

- **Tests Zod** - Validation des schemas de trips et utilisateurs
- **Tests Zustand** - Store actions et selectors
- **Tests de Composants** - Montage, rendu, interactions utilisateur

### Lancer les Tests

```bash
# Tous les tests
npm run test

# Mode watch
npm run test -- --watch

# Couverture
npm run test:coverage
```

---

## Choix Architecturaux Détaillés

### 1. **Zustand Stores**

Deux stores principaux :

#### `useTripStore`

```typescript
- trips: Trip[]
- selectedTrip: Trip | null
- addTrip(trip: Trip)
- updateTrip(id: string, updates: Partial<Trip>)
- deleteTrip(id: string)
- selectTrip(id: string)
- toggleFavorite(id: string)
```

Patterns utilisés :

- **Sélecteurs stricts** : `useTripStore((state) => state.trips)` au lieu de `const store = useTripStore()`
- **Computed state** : Selector pour filtrer les favoris on-the-fly
- **Persist middleware** : Sauvegarde des favoris en localStorage

#### `useUserStore`

```typescript
- user: User | null
- isAuthenticated: boolean
- setUser(user: User)
- logout()
- updateProfile(updates: Partial<User>)
```

### 2. **React Query Setup**

Centralisation dans `shared/api/` :

```typescript
// queryKeys.ts - Uniform key factory
export const tripKeys = {
  all: ["trips"] as const,
  lists: () => [...tripKeys.all, "list"] as const,
  list: (filters: TripFilters) => [...tripKeys.lists(), filters] as const,
  details: () => [...tripKeys.all, "detail"] as const,
  detail: (id: string) => [...tripKeys.details(), id] as const,
};

// queries.ts - Hooks personnalisés
export const useTrips = (filters: TripFilters) => {
  return useQuery({
    queryKey: tripKeys.list(filters),
    queryFn: () => fetchTrips(filters),
    staleTime: 5 * 60 * 1000, // 5 min
  });
};

// Utilisation en composant
const MyComponent = () => {
  const { data: trips, isLoading } = useTrips(filters);
  // Jamais de useQuery directement en composant !
};
```

### 3. **Zod pour la Validation**

Schémas centralisés en `entities/*/` :

```typescript
// trip/trip-schema.ts
export const TripSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(100),
  startDate: z.date(),
  endDate: z.date(),
  destination: z.string().min(2),
  budget: z.number().positive(),
  members: z.array(UserSchema),
});

export type Trip = z.infer<typeof TripSchema>;

// Dans les formulaires
const form = useForm({
  resolver: zodResolver(TripSchema),
});

// Dans les réponses API
const tripData = TripSchema.parse(apiResponse);
// Ou avec gestion d'erreur
const result = TripSchema.safeParse(apiResponse);
if (!result.success) {
  console.error(result.error);
}
```

### 4. **TypeScript Strict Mode**

Configuration dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Zéro `any`** - Tous les types sont explicites </br>
**Zéro `as unknown as`** - Types corrects dès le départ

### 5. **Composants Réutilisables**

Dans `shared/components/ui/` :

```typescript
// CustomButton.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  ...props
}) => {
  // Implementation
};
```

---

## Pages et Routes

```
/ → HomePage (Listing des trips)
├── /login → LoginPage
├── /register → RegisterPage (via LoginPage)
├── /profile → ProfilePage (Protégée)
├── /trip/:id → TripPage (Détail)
├── /trip/create → CreateTripForm (Protégée)
├── /trip/:id/edit → EditTripForm (Protégée)
└── /calendar → CalendarPage (Protégée)
```

---

## Configuration Supabase

### Tables Requises

1. **users** (auto-créée par Supabase Auth)
2. **trips**

   ```sql
   CREATE TABLE trips (
     id UUID PRIMARY KEY,
     title VARCHAR(100) NOT NULL,
     destination VARCHAR(255) NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     budget DECIMAL(10, 2),
     owner_id UUID REFERENCES auth.users(id),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **trip_favorites**
   ```sql
   CREATE TABLE trip_favorites (
     user_id UUID REFERENCES auth.users(id),
     trip_id UUID REFERENCES trips(id),
     created_at TIMESTAMP DEFAULT NOW(),
     PRIMARY KEY (user_id, trip_id)
   );
   ```

Migration appliquée dans `/supabase/migrations/20260326110522_new-migration.sql`

---

## Apprentissages et Patterns

### Feature Sliced Design

- Scalabilité - Ajouter une feature sans affecter le reste
- Maintenabilité - Chaque slice est autonome
- Testabilité - Isolation des dépendances

### Zustand + React Query

- **UI State** (Zustand) : selectedTrip, filters, modal open
- **Server State** (React Query) : trips data, loading states, errors

### TypeScript Strict

- Détection des bugs à la compilation
- Meilleure autocomplétion IDE
- Documentation du code via types

---

## Licence

MIT - Projet académique M2 Archi Frontend

## Auteurs

Céline EAP & Héloïse LE LEZ
