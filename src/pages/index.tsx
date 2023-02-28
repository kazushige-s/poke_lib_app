import Card from "@/components/Card/Card";
import { getAllPokemon, getPokemon } from "@/utils/pokemon";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type data = {
  name: string;
  url: string;
};

type pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: [
    {
      type: {
        name: string;
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

export default function Home() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  //初回レンダリング時に実行
  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのポケモンデータを取得
      const res: any = await getAllPokemon(initialURL);
      //各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res.results);

      //ロード中の状態を解除
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //loadPokemon関数を作成。引数にはすべてのポケモンデータを渡す
  const loadPokemon = async (data: [data]) => {
    //Promise.allを使って、すべてのポケモンデータを取得。promise.allは、すべての非同期処理が終わったら、thenメソッドを実行する
    //anyを使っているので、型をつけたい！！
    const _pokemonData:any = await Promise.all(
      //map関数を使って、各ポケモンの詳細データを取得
      data.map((pokemon) => {
        //変数pokemonRecordに、各ポケモンの詳細データを格納
        const pokemonRecord = getPokemon(pokemon.url);
        //pokemonRecordを返す
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {pokemonData.map((pokemon:pokemon, i: number) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )
      }
    </div>
  );
}
