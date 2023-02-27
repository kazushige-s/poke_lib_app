import { getAllPokemon, getPokemon } from "@/utils/pokemon";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type data = {
  name: string;
  url: string;
};

export default function Home() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //ロード中かどうかの状態
  const [loading, setLoading] = useState(true);

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
  const loadPokemon = (data: [data]) => {
    
    //Promise.allを使って、すべてのポケモンデータを取得
    const _pokemonData = Promise.all(
      //map関数を使って、各ポケモンの詳細データを取得
      data.map((pokemon) => {
        //変数pokemonRecordに、各ポケモンの詳細データを格納
        const pokemonRecord = getPokemon(pokemon.url);
        //pokemonRecordを返す
        return pokemonRecord;
      })
    );
  };

  return (
    <div>{loading ? <h1>loading...</h1> : <h1>データを取得しました</h1>}</div>
  );
}
