import React from "react";


const Card = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className="">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>なまえ:{pokemon.name}</h3>
      <h4>タイプ</h4>
      {pokemon.types.map((type: string, i: number) => {
        return <p key={i}>{type.type.name}</p>;
      })}
      <div>
        <p>おおきさ:{pokemon.height * 10} cm</p>
        <p>おもさ:{pokemon.weight / 10} kg</p>
        <p>アビリティ:{pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
  );
};

export default Card;
