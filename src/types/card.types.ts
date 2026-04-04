export interface Card {
  object: 'card';
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id?: number;
  tcgplayer_id?: number;
  tcgplayer_etched_id?: number;
  cardmarket_id?: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: CardLayout;
  highres_image: boolean;
  image_status: ImageStatus;
  image_uris?: ImageUris;
  mana_cost: string;
  cmc: ConvertedManaCost;
  type_line: string;
  oracle_text?: string;
  colors: Color[];
  color_identity: Color[];
  keywords: string[];
  produced_mana?: Color[];
  legalities: Legalities;
  games: Game[];
  reserved: boolean;
  game_changer?: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: Finish[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: Rarity;
  watermark?: string;
  flavor_text?: string;
  card_back_id: string;
  artist?: string;
  artist_ids?: string[];
  illustration_id?: string;
  border_color: BorderColor;
  frame: string;
  security_stamp?: SecurityStamp;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank?: number;
  preview?: Preview;
  prices?: Prices;
  related_uris?: RelatedUris;
  purchase_uris?: PurchaseUris;
}

export interface ImageUris {
  small?: string;
  normal?: string;
  large?: string;
  png?: string;
  art_crop?: string;
  border_crop?: string;
}

export interface ConvertedManaCost {
  source: string;
  parsedValue: number;
}

export interface Legalities {
  standard: Legality;
  future: Legality;
  historic: Legality;
  timeless: Legality;
  gladiator: Legality;
  pioneer: Legality;
  modern: Legality;
  legacy: Legality;
  pauper: Legality;
  vintage: Legality;
  penny: Legality;
  commander: Legality;
  oathbreaker: Legality;
  standardbrawl: Legality;
  brawl: Legality;
  alchemy: Legality;
  paupercommander: Legality;
  duel: Legality;
  oldschool: Legality;
  premodern: Legality;
  predh: Legality;
}

export interface Preview {
  source: string;
  source_uri?: string;
  previewed_at: string;
}

export interface Prices {
  usd?: string;
  usd_foil?: string;
  usd_etched?: string;
  eur?: string;
  eur_foil?: string;
  tix?: string;
}

export interface RelatedUris {
  gatherer?: string;
  tcgplayer_infinite_articles?: string;
  tcgplayer_infinite_decks?: string;
  edhrec?: string;
}

export interface PurchaseUris {
  tcgplayer?: string;
  cardmarket?: string;
  cardhoarder?: string;
}

// Union types for specific values
export type CardLayout = 
  | 'normal'
  | 'split'
  | 'flip'
  | 'transform'
  | 'modal_dfc'
  | 'meld'
  | 'leveler'
  | 'saga'
  | 'adventure'
  | 'planar'
  | 'scheme'
  | 'vanguard'
  | 'token'
  | 'double_faced_token'
  | 'emblem'
  | 'augment'
  | 'host'
  | 'art_series'
  | 'reversible_card';

export type ImageStatus = 
  | 'missing'
  | 'placeholder'
  | 'lowres'
  | 'highres_scan';

export type Color = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

export type Game = 'paper' | 'arena' | 'mtgo';

export type Finish = 'nonfoil' | 'foil' | 'etched' | 'glossy';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'special' | 'bonus';

export type BorderColor = 'black' | 'white' | 'borderless' | 'silver' | 'gold';

export type SecurityStamp = 'oval' | 'triangle' | 'acorn' | 'arena' | 'heart';

export type Legality = 'legal' | 'not_legal' | 'restricted' | 'banned';
