import { NameUrlRelation, SummaryPokemon } from '@shared/entities/dtos';

export interface GetPokemonByTypeDTO {
  damage_relations: Damagerelations;
  game_indices: GameIndex[];
  generation: NameUrlRelation;
  id: number;
  move_damage_class: NameUrlRelation;
  moves: NameUrlRelation[];
  name: string;
  names: Name[];
  pokemon: SummaryPokemon[];
}

interface GameIndex {
  game_index: number;
  generation: NameUrlRelation;
}

interface Damagerelations {
  double_damage_from: NameUrlRelation[];
  double_damage_to: NameUrlRelation[];
  half_damage_from: NameUrlRelation[];
  half_damage_to: NameUrlRelation[];
  no_damage_from: any[];
  no_damage_to: any[];
}

interface Name {
  language: NameUrlRelation;
  name: string;
}
