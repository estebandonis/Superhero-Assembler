export type hero = {
  id: number;
  alias: string;
  fullName: string;
  imagePreview: string;
  image: string;
  powerLevel: number;
  powerstats: {
    [key: string]: number;
  };
  favorite?: boolean;
};

export type team = {
  id: number;
  name: string;
};
