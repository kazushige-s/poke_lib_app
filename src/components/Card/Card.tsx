import { FC } from "react";
import { pokemonType } from "src/pages";

const Card:FC<any> = ({ pokemon }) => {
  return (
    <li className="w-full rounded-2xl bg-white px-4 py-4 shadow-lg shadow-gray-300">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto"
      />
      <h3 className="mb-3 text-lg font-bold">なまえ:{pokemon.name}</h3>
      <div className="flex">
        <h4 className="flex gap-3">タイプ：</h4>
        <ul className="flex gap-3">
          {pokemon.types.map((type:any, i: number) => {
            return <li key={i}>{type.type.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <p>おおきさ：{pokemon.height * 10} cm</p>
        <p>おもさ：{pokemon.weight / 10} kg</p>
        <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
      </div>
    </li>
  );
};

export default Card;
