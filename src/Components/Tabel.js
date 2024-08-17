const Tabel=({cripto})=>{

  // console.log(cripto);
  


  

  return(
      <table>
          <thead></thead>
          <tbody>
          {cripto.map((item,index)=>{
              let color=item.price_change_percentage_24h<0?"red":"green"
             return (<tr key={index}>
              <td className="img-name">
                  <img src={item.image} />
                  <p>{item.name}</p>
              </td>
              <td>{item.symbol.toUpperCase()}</td>
              <td>$ {item.current_price}</td>
              <td>$ {item.total_volume}</td>
              <td style={{color:color}}>{item.price_change_percentage_24h} %</td>
              <td>Mkt Cap: {item.market_cap}</td>

             </tr>)
          })}
          </tbody>
     </table>
  )
}


export default Tabel;