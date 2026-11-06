export interface GenerationConfig {
  id: string;
  name: string;
  region: string;
  offset: number;
  limit: number;
}

export const GENERATIONS: GenerationConfig[] = [
  { id: 'gen1', name: 'Gen I', region: 'Kanto', offset: 0, limit: 151 },
  { id: 'gen2', name: 'Gen II', region: 'Johto', offset: 151, limit: 100 },
  { id: 'gen3', name: 'Gen III', region: 'Hoenn', offset: 251, limit: 135 },
  { id: 'gen4', name: 'Gen IV', region: 'Sinnoh', offset: 386, limit: 107 },
  { id: 'gen5', name: 'Gen V', region: 'Unova', offset: 493, limit: 156 },
  { id: 'gen6', name: 'Gen VI', region: 'Kalos', offset: 649, limit: 72 }, 
  { id: 'gen7', name: 'Gen VII', region: 'Alola', offset: 721, limit: 88 }, 
  { id: 'gen8', name: 'Gen VIII', region: 'Galar', offset: 809, limit: 96 }, 
  { id: 'gen9', name: 'Gen IX', region: 'Paldea', offset: 905, limit: 120 }, 
];