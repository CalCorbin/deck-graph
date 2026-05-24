import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  imageUrl: string;
  cardType?: string;
  rarity?: string;
  manaCost?: string;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}
