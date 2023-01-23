import iconGitHub from '../assets/images/icon_github.png'
import iconLinkedin from '../assets/images/icon_linkedin.png'
import '../assets/styles/footer.css'

export default function FooterComponent() {
     return (
          <footer>
               <div className='dev-container'>
                    <p>Desenvolvido por <a>Rafael Vizú</a></p>
               </div>
               <div className='social-container'>
                    <a href="https://github.com/rafaelvizu/financeiro" target="_blank" rel="author">
                         <img src={iconGitHub} alt="acessar repositório" />
                    </a>
                    <a href="https://www.linkedin.com/in/rafael-vizu" target="_blank" rel="author">
                         <img src={iconLinkedin} alt="acessar linke" />
                    </a>
               </div>
          </footer>
     )
}