import { NameUrlRelation } from '@shared/entities/dtos';

export interface DetailedPokemon {
  abilities: AbilityInfo[];
  base_experience: number;
  forms: NameUrlRelation[];
  game_indices: Gameindex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveInfo[];
  name: string;
  order: number;
  past_types: any[];
  species: NameUrlRelation;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Type {
  slot: number;
  type: NameUrlRelation;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrlRelation;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface MoveInfo {
  move: NameUrlRelation;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameUrlRelation;
  version_group: NameUrlRelation;
}

interface Gameindex {
  game_index: number;
  version: NameUrlRelation;
}

export interface AbilityInfo {
  ability: NameUrlRelation;
  is_hidden: boolean;
  slot: number;
}
