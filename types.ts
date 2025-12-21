
export interface Character {
  name: string;
  characterClass: string;
  health: number;
  mana: number;
  strength: number;
  portraitUrl?: string | null;
  backstory?: string | null;
}
