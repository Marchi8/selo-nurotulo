import LoadingBackdrop from './styles';
import LoadingLogo from '../../assets/LoadingLogo.svg'

function LoadingSpinner() {
  return (
    <LoadingBackdrop>
      <img src={LoadingLogo} alt="Carregando..." className="loading-logo" />
    </LoadingBackdrop>
  );
}

export default LoadingSpinner;
