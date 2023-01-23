import closeIcon from '../assets/images/icon_close.svg'
import '../assets/styles/modal.css'
import { useState, useEffect } from 'react';

export default function ModalComponent(props) {
     const [id, setId] = useState("");

     useEffect(() => {
          setId(props.dataID);
     }, [props.dataID]);

     function openModal() {
          const div = document.querySelector(`.modal-${id}`);
          div.style.display = "flex";
     }

     function closeModal() {
          const div = document.querySelector(`.modal-${id}`);
          div.style.display = "none";
     }

     return (
          <div className="modal-container">
               <div id='modal' className={`modal-${id}`}>
                    <div className="modal-children">
                              <img src={closeIcon} alt="fechar janela" onClick={() => closeModal()}/>
                              {props.children}
                    </div>
               </div>
               <button onClick={() => openModal()}>{props.textButton}</button>
          </div>
     )
}