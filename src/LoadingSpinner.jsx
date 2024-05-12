import LoadingBackdrop from './spinner';
import LoadingLogo from '../src/LoadingLogo.svg';

function LoadingSpinner() {
  return (
    <LoadingBackdrop>
      <img src={LoadingLogo} alt="Carregando..." className="loading-logo" />
    </LoadingBackdrop>
  );
}

export default LoadingSpinner;
