export interface EnvironmentalImpact {
  co2Saved: number;
  energySaved: number;
  waterSaved: number;
  treesEquivalent: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface User {
  email: string;
  instagramHandle: string;
}