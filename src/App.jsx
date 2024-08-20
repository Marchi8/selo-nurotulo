import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './home';
import LoadingSpinner from './LoadingSpinner';
import HomeLogo from '../src/HomeLogo.svg';
// import CertifiedLogo from '../src/CertifiedLogo.svg';
// import ClickHereLogo from '../src/ClickHereLogo.svg';
import ClickHereButtonLogo from '../src/ClickHereButtonLogo.svg';
import CertifiedBackground from '../src/CertifiedBackground.svg';
import CertifiedText from '../src/CertifiedText.svg';
import AprovedImg from '../src/AprovedImg.svg';
import ESGimage from '../src/ESGimage.svg';
import Downloadimage from '../src/Downloadimage.svg';
import AppleDownload from '../src/AppleDownload.svg';
import AndroidDownload from '../src/AndroidDownload.svg';
// import AboutBG1 from '../src/AboutBG1.svg';

function App() {
  const [apiProduct,setApiProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const { gtin } = useParams();
  const gtin = window.location.hash;

  const getProduct = async () => {
    await axios.get(`https://api.nurotulo.app/api:P0c5c7Xy/product/${gtin.substring(2)}`)
    .then(res=>{
      setApiProduct(res.data)
      getRelated(res.data.related)
    })
    .catch(err=>console.log('produto não encontrado /',err))
  };

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
  };

  const handleClick = (ean) => {
    window.location.href = `https://nurotulo.app/01/0${ean}`;
  };

  useEffect(()=>{
    getProduct()
  },[gtin]);

  return (
    <div className="App">
    <Main>
      {apiProduct.photo ?  
        <div className="container">
          <div className="logoContainer">
            <img className="logo" src={HomeLogo} alt="NuRótulo Logo" />
          </div>
          
          <div className="productInfo">
         
            <div className="productImgContainer">
            <img className="productImg" src={apiProduct?.photo?.url} alt="product image" />
            </div>
            
            <div className="productDetails">
              <p className="details">{apiProduct?.name}</p>
              {/* <p className="details">Farinha de arroz, 1kg</p> */}
              <p className="title">RÓTULO CERTIFICADO!</p>
              <p className="date">DATA DE EMISSÃO: {apiProduct.valid}.</p>
              
              <div className="certifiedContainer">
                <img src={CertifiedBackground} alt="" className="certifiedBackground"/>
                <img src={CertifiedText} alt=""  className="certifiedText"/>
              </div>
            
            </div>

          </div>

          <div className="relatedProductsContainer">
            <p className="relatedProductsTitle">Veja outros produtos similares da própria MARCA</p>
            
            <div className="relatedProducts">
              {relatedProducts.length ?
              relatedProducts.map((product, index) => (
                <button onClick={() => handleClick(product.ean)} key={index} className="relatedProductButton">
                  <img className="relatedProductImg" src={product?.photo?.url} alt="product suggestion image" />
                </button>
              )) : null}
            </div>

            <button onClick={() => window.open(apiProduct.site, '_blank')} 
              className="clickHereContainer">
        
              <div className="clickHereButton">
                <p>Ir à loja virtual</p>
              </div>

              <img src={ClickHereButtonLogo} alt="" />
           
            </button>
          </div>



          <div className="aboutContainer">
           
            {/* <img src={AboutBG1} alt="" /> */}
            
            <div className="aprovedAbout">
              <img src={AprovedImg} alt="" />
              <h4 className="">Este RÓTULO passou por curadoria referente às boas práticas de rotulagem, conforme legislação vigente, e foi APROVADO.</h4>
            </div>

            <div className="esgAbout">
              <img src={ESGimage} alt="" />
              <h4 className="">O Selo ESG de Integridade do Rótulo é um certificado de responsabilidade social.</h4>
            </div>

            <div className="dowloandAbout">
              <img src={Downloadimage} alt="" />

              <div className="downlaodButtonsContainer">  
                <button onClick={() =>  window.open("https://apps.apple.com/br/app/nur%C3%B3tulo/id1522091609", '_blank')} className="appleButton">
                  <img src={AppleDownload} alt="" />
                </button>

                <button onClick={() => window.open("https://play.google.com/store/apps/details?id=br.com.nurotulo.mobile&hl=pt_BR&gl=US", '_blank')} className="androidButton">
                  <img src={AndroidDownload} alt="" />
                </button>
              </div>

            </div>
          </div>

        </div>

      :  <LoadingSpinner />}
    </Main>
  </div>
  );
}

export default App
