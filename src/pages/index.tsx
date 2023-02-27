import { getAllPokemon } from '@/utils/pokemon';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //ロード中かどうかの状態
  const [loading, setLoading] = useState(true);

  //初回レンダリング時に実行
  useEffect(() => {
    const fetchPokemonData=async()=>{
      //すべてのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      console.log(res);
      //ロード中の状態を解除
      setLoading(false);
    }
    fetchPokemonData();
  }, []);

  return (
    <div>
      {loading ? <h1>loading...</h1> : <h1>データを取得しました</h1>}
    </div>
  )
}
