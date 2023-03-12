export type pokemonType = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: [
    {
      type: {
        type: {
          name: string;
        };
      };
    }
  ];
  height: number;
  weight: number;
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
};
