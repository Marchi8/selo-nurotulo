import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Main from './styles';
import HomeLogo from '../../assets/HomeLogo.svg'
import CertifiedLogo from '../../assets/CertifiedLogo.svg'
import ClickHereLogo from '../../assets/ClickHereLogo.svg'
import LoadingSpinner from '../../components/Loading';

function Product() {

  const [apiProduct,setApiProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { gtin } = useParams();

  const getProduct = async () => {
    await axios.get(`https://api.nurotulo.app/api:P0c5c7Xy/product/${gtin.substring(1)}`)
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

  useEffect(()=>{
    getProduct()
  },[])

  return (
    <Main>
      {apiProduct.photo?  
        <div style={{marginTop:70,display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'column',maxWidth:342,width:'90vw'}}>
        <img style={{position:'relative',top:-20}} src={HomeLogo} alt="NuRótulo Logo" />
        <div style={{display:'flex',flexDirection:'row', alignItems:'center',marginBottom:10,}}>
          <img className='productImg' src={apiProduct?.photo?.url} alt="product image" />
          <div style={{textAlign:'left',marginLeft:10,display:'flex',justifyContent:'start',flexDirection:"column"}}>
            <p style={{fontSize:16,margin:0,fontWeight:'bold'}}>RÓTULO CERTIFICADO</p>
            <p style={{fontSize:13,margin:0,fontWeight:'500'}}>DATA DE EMISSÃO: 29/04/2024.</p>
            <p style={{fontSize:13,margin:0,fontWeight:'500'}}>{apiProduct?.name}</p>
          </div>
          <img src={CertifiedLogo} alt="Certified Logo" />
        </div>

        <div style={{maxWidth:352, width:'90vw', textAlign:'left',marginBottom:15}}>
            <h4 style={{fontSize:13,maxWidth:300,fontWeight:'500'}}>DATA DE EMISSÃO: 29/04/2024.</h4>
            <h4 style={{fontSize:13,maxWidth:300,fontWeight:'500'}}>Este RÓTULO passou por curadoria referente às boas práticas de rotulagem, conforme legislação vigente, e foi APROVADO.</h4>
            <h4 style={{fontSize:13,maxWidth:300,fontWeight:'500'}}>O Selo ESG de Integridade do Rótulo é um certificado de responsabilidade social.</h4>
            <h4 style={{fontSize:13,maxWidth:300,fontWeight:'500'}}>Encontre esse produto e produtos similares, direto na LOJA VIRTUAL e receba na sua casa.</h4>
        </div>

        <div>
          <div style={{display:'flex',gap:24,marginBottom:30}}>
            {relatedProducts.length?
            relatedProducts.map((product,index)=>(
              <button key={index} style={{width:65,height:86,borderRadius:15,backgroundColor:'#FFFFFF', display:'flex', alignItems:'center',justifyContent:'center'}}>
                <img style={{width:65,height:86,borderRadius:15,backgroundColor:'#FFFFFF'}} src={product?.photo?.url} alt="product suggestion image" />
              </button>
            )) : null}
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={ClickHereLogo} alt="Click here logo" />
            <button style={{backgroundColor:'#FFFFFF', width:85,height:85,borderRadius:100, border:'2px solid white',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <img style={{width:80,height:80, borderRadius:100,}}  src={apiProduct?.siteLogo?.url} alt="Company logo" />
            </button>
          </div>
        </div>
      </div>
      :   <LoadingSpinner/>}
    
    </Main>
  );
}

export default Product
