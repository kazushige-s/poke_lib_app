//関数getAllPokemonを定義
export const getAllPokemon = (url: string) => {
  //Promiseオブジェクトを返す
  return new Promise((resolve, reject) => {
    //fetchメソッドでurlを取得
    fetch(url)
      //resで受け取ったデータをjson形式に変換
      .then((res) => res.json())
      //json形式のデータをdataとして受け取り、resolve(data)でPromiseオブジェクトを返す
      .then((data) => resolve(data));
  });
};

export const getPokemon = () => {};
