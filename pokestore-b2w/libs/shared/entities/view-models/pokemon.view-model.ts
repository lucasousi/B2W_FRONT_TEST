import { AbilityInfo, Sprites } from '../dtos/get-detailed-pokemon.dto';

export enum PokemonType {
  Water = 'water',
  Fire = 'fire',
  Psychic = 'psychic',
}

export interface PokemonViewModel {
  id: number;
  abilities: AbilityInfo[];
  height: number;
  name: string;
  sprites: Pick<Sprites, 'front_default'>;
  weight: number;
  price?: number;
  type?: PokemonType;
}
