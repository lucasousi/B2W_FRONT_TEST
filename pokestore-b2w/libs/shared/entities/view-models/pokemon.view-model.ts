import { AbilityInfo, Sprites } from '../dtos/get-detailed-pokemon.dto';

export interface PokemonViewModel {
  abilities: AbilityInfo[];
  height: number;
  name: string;
  sprites: Pick<Sprites, 'front_default'>;
  weight: number;
  price: number;
}
