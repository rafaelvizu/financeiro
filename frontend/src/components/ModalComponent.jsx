import closeIcon from '../assets/images/icon_close.svg'
import '../assets/styles/modal.css'

export default function ModalComponent(props) {

     function openModal() {
          const div = document.querySelector(`#modal${props.id}`);
          div.style.display = "flex";
     }

     function closeModal() {
          const div = document.querySelector(`#modal${props.id}`);
          div.style.display = "none";
     }

     return (
          <div className="modal-container">
               <div className="modal" id={'modal'+props.id}>
                    
                    <div className="modal-children" id={props.id}>
                         <img src={closeIcon} alt="fechar janela" onClick={() => closeModal()}/>
                         {props.children}
                    </div>
               </div>
               <button onClick={() => openModal()}>{props.textButton}</button>
          </div>
     )
}