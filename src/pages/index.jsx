import { useParams } from 'react-router-dom';
// import '../App.css'
// import Background from '../assets/Background.svg'

function Product() {
  const { gtin } = useParams();
  console.log('gtin =====>',gtin)

  return (
    <div  style={{display:'flex',alignItems:'center',justifyContent:'center' }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <h1>nurotulo</h1>
        <div>
          <h2>RÓTULO CERTIFICADO</h2>
          <h3>DATA DE EMISSÃO: 29/04/2024.</h3>
          <h3>Farinha de arroz, 1kg</h3>
        </div>

        <div>
            <h4>Este RÓTULO passou por curadoria referente às boas práticas de rotulagem, conforme legislação vigente, e foi APROVADO.</h4>
            <h4>O Selo ESG de Integridade do Rótulo é um certificado de responsabilidade social.</h4>
            <h4>Encontre esse produto e produtos similares, direto na LOJA VIRTUAL e receba na sua casa.</h4>
        </div>
      </div>
    </div>
  );
}

export default Product
