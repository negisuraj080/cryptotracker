import { useEffect, useState } from "react";
import Tabel from "./Tabel";

const Input = () => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  const [input, setInput] = useState("");
  const [cripto, setCripto] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setCripto(data);
    } catch (err) {
      console.log(err);
    }
  };


   //Fetch data using .then
   const fetchDataThen = () => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    )
      .then((response) => response.json())
      .then((data) => setCripto(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const filteredCoins = cripto
    .filter((coin) => 
      coin.name.toLowerCase().includes(input.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(input.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "market_cap") {
        return b.market_cap - a.market_cap;
      } else if (sortCriteria === "percentage_change") {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
      return 0;
    });

  return (
    <>
      <div className="head-container">
        <input 
          type="text" 
          placeholder="Search By Name or Symbol" 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={() => setSortCriteria("market_cap")}>Sort By Mkt Cap</button>
        <button onClick={() => setSortCriteria("percentage_change")}>Sort by Percentage</button>
      </div>
      <Tabel cripto={filteredCoins} />
    </>
  );
};

export default Input;