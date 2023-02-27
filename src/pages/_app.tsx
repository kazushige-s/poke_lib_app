import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const fetchPokemonData=async()=>{
      //すべてのポケモンデータを取得
      const res = await getAllPokemon();
    }
  }, []);

  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  return <Component {...pageProps} />;
}
