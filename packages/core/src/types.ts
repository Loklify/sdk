export interface LoklifyOptions {
  /** ID du projet Loklify */
  project: string
  /** @internal Override de l'URL API — usage interne uniquement */
  apiBase?: string
  /** Bearer token optionnel pour les projets privés */
  token?: string
}

export type Messages = Record<string, string>
