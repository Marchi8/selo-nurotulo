import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './home';
import LoadingSpinner from './LoadingSpinner';
import HomeLogo from '../src/HomeLogo.svg';
import CertifiedLogo from '../src/CertifiedLogo.svg';
import ClickHereLogo from '../src/ClickHereLogo.svg';

function App() {
  const [apiProduct,setApiProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const { gtin } = useParams();
  const gtin = window.location.hash

  const getProduct = async () => {
    await axios.get(`https://api.nurotulo.app/api:P0c5c7Xy/product/${gtin.substring(2)}`)
    .then(res=>{
      setApiProduct(res.data)
      getRelated(res.data.related)
    })
    .catch(err=>console.log('produto não encontrado /',err))
  }

  const getRelated = async(related) => {
    const relatedProductsData = [];
      for (const ean of related) {
        try {
          const response = await axios.get(`https://api.nurotulo.app/api:P0c5c7Xy/product/${ean}`);
          relatedProductsData.push(response.data);
        } catch (error) {
          console.error(`Erro ao buscar o produto ${ean}:`, error);
        }
      }
      setRelatedProducts(relatedProductsData);
  }

  const handleClick = (ean) => {
    window.location.href = `https://nurotulo.app/01/0${ean}`;
  };

  useEffect(()=>{
    getProduct()
  },[gtin])

  return (
    <div className="App">
    <Main>
      {apiProduct.photo ?  
        <div className="container">
          <img className="logo" src={HomeLogo} alt="NuRótulo Logo" />
          <div className="product-info">
            <img className="productImg" src={apiProduct?.photo?.url} alt="product image" />
            <div className="product-details">
              <p className="title">RÓTULO CERTIFICADO</p>
              <p className="details">DATA DE EMISSÃO: {apiProduct.valid}.</p>
              <p className="details">{apiProduct?.name}</p>
            </div>
            <img className="certifiedLogo" src={CertifiedLogo} alt="Certified Logo" />
          </div>

          <div className="description">
            <h4 className="details">DATA DE EMISSÃO: {apiProduct.valid}.</h4>
            <h4 className="details">Este RÓTULO passou por curadoria referente às boas práticas de rotulagem, conforme legislação vigente, e foi APROVADO.</h4>
            <h4 className="details">O Selo ESG de Integridade do Rótulo é um certificado de responsabilidade social.</h4>
          </div>

          <div>
            <div className="related-products">
              {relatedProducts.length ?
              relatedProducts.map((product, index) => (
                <button onClick={() => handleClick(product.ean)} key={index} className="related-product-button">
                  <img className="related-product-img" src={product?.photo?.url} alt="product suggestion image" />
                </button>
              )) : null}
            </div>

            <div className="click-here">
              <img src={ClickHereLogo} alt="Click here logo" />
              <a href={apiProduct.site} target="_blank" rel="noopener noreferrer" className="click-here-button">
                <img className="site-logo" src={apiProduct?.siteLogo?.url} alt="Company logo" />
              </a>
            </div>
          </div>
        </div>
      :  <LoadingSpinner />}
    </Main>
  </div>
  );
}

export default App
