import { useEffect, useState } from "react";
import Card from "src/components/Card/Card";
import Nabvar from "src/components/Navbar/Nabvar";
import { pokemonType } from "src/Types/PokemoType";
import { getAllPokemon, getPokemon } from "src/utils/pokemon";

export default function Home() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  //初回レンダリング時に実行
  useEffect(() => {
    const fetchPokemonData = async () => {
      //すべてのポケモンデータを取得
      //getAllpokemonにpropsとして、initialURLを渡す
      //awaitを使って、データを取得するまで待つ
      const res: any = await getAllPokemon(initialURL);
      //各ポケモンの詳細データを取得
      loadPokemon(res.results);
      // console.log(res);

      setNextUrl(res.next);
      setPrevUrl(res.previous);
      //ロード中の状態を解除
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  //loadPokemon関数を作成。引数にはすべてのポケモンデータを渡す
  const loadPokemon = async (data: [pokemonType]) => {
    //Promise.allを使って、すべてのポケモンデータを取得。promise.allは、すべての非同期処理が終わったら、thenメソッドを実行する
    const _pokemonData: any = await Promise.all(
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

  //前へボタンを押した時の処理
  const handlePrevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const data: any = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  //次へボタンを押した時の処理
  const handleNextPage = async () => {
    setLoading(true);
    const data: any = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // console.log(pokemonData);
  return (
    <>
      <div className="sticky top-0 z-50">
        <Nabvar />
      </div>
      <div className="bg-sky-50 py-5 ">
        <div className="container mx-auto">
          {loading ? (
            // ローダーを表示
            <div className="flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <ul className="mx-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pokemonData.map((pokemon: pokemonType, i: number) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </ul>
          )}
        </div>

        {/* ボタンを表示 */}
        <div className="sticky bottom-1 my-5 flex justify-center gap-10 text-lg font-bold">
          <button
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
            onClick={handlePrevPage}
          >
            前へ
          </button>
          <button
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
            onClick={handleNextPage}
          >
            次へ
          </button>
        </div>
      </div>
    </>
  );
}
