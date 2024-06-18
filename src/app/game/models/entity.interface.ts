export interface Entity {
  name: EntityName;
  image: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  supernatural: number;
  defense: number;
  speed: number;
  hp: number;
}

interface EntityName {
  singular: string;
  plural: string;
}
