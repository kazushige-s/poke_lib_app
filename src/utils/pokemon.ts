type url = string;

//関数getAllPokemonを定義
export const getAllPokemon = (url: url) => {
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

export const getPokemon = (url: url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  });
};
