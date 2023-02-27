import { getAllPokemon } from '@/utils/pokemon';
import { Inter } from 'next/font/google'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData=async()=>{
      //すべてのポケモンデータを取得
      const res = await getAllPokemon(initialURL);
      console.log(res);
    }
    fetchPokemonData();
  }, []);

  return (
    <div>test</div>
  )
}
