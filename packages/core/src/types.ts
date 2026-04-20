export interface LoklifyOptions {
  /** ID du projet Loklify */
  project: string
  /** Base URL de l'API (défaut : https://app.loklify.io) */
  apiBase?: string
  /** Bearer token optionnel pour les projets privés */
  token?: string
}

export type Messages = Record<string, string>
