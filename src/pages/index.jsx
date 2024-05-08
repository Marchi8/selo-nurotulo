import { useParams } from 'react-router-dom';
import '../App.css'

function Product() {
  const { gtin } = useParams();
  console.log('gtin =====>',gtin)
  return (
    <div className="App">
       <h1 style={{backgroundColor:'red'}}>
        selo-nurotulo
       </h1>
    </div>
  );
}

export default Product
