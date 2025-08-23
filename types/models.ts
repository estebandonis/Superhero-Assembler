export type hero = {
  id: number;
  alias: string;
  fullName: string;
  alterEgos: string[];
  imagePreview: string;
  image: string;
  powerLevel: number;
  powerStats: {
    [key: string]: number;
  };
  favorite?: boolean;
};

export type team = {
  id: number;
  name: string;
};
