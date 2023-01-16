import '../assets/styles/loadingComponent.css'
import iconLoading from '../assets/images/icon_loading.png'

export default function LoadingComponent() {
     return (
          <div className="loading-container">
               <img src={iconLoading} alt="Carregando..." />
          </div>
     )
}