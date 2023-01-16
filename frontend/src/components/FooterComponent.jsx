import iconGitHub from '../assets/images/icon_github.png'
import iconLinkedin from '../assets/images/icon_linkedin.png'
import '../assets/styles/footer.css'

export default function FooterComponent() {
     return (
          <footer>
               <div className='dev-container'>
                    <p>Desenvolvido por <a href="https://github.com/rafaelvizu" target="_blank" rel="author">Rafael Vizú</a></p>
               </div>
               <div className='social-container'>
                    <a href="" target="_blank" rel="author">
                         <img src={iconGitHub} alt="acessar repositório" />
                    </a>
                    <a href="" target="_blank" rel="author">
                         <img src={iconLinkedin} alt="acessar linke" />
                    </a>
               </div>
          </footer>
     )
}