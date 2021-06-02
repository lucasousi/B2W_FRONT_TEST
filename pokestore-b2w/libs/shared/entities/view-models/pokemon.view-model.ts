import { AbilityInfo, MoveInfo, Sprites } from '../dtos/get-detailed-pokemon.dto';
import { NameUrlRelation } from '../dtos/name-url-relation';

export interface PokemonViewModel {
  abilities: AbilityInfo[];
  height: number;
  moves: MoveInfo[];
  name: string;
  species: NameUrlRelation;
  sprites: Sprites;
  weight: number;
  price: number;
}
