import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";


export default function Header() {



     useEffect(() => {
          mobileNavBar();
          navBarFixed();
     }, [])

     function mobileNavBar() {
          new class MobileNavBar {
               constructor() {
                    this.mobileMenu = document.querySelector('.mobile-menu');
                    this.navList = document.querySelector('.nav-list');
                    this.navLinks = document.querySelectorAll('.nav-list li');
                    this.activeClass = "active";
          
                    this.handleClick = this.handleClick.bind(this);
                    this.init();
               }
          
          
               handleClick() {
                    this.navList.classList.toggle(this.activeClass);
               }
          
               addClickEvent() {
                    this.mobileMenu.addEventListener("click", () => this.handleClick());
               }
          
               addLinkEvent() {
                    this.navLinks.forEach(li => {
                         li.addEventListener("click", () => {
                              this.handleClick();
                         });
                    });
               }
          
               init() {
                    if (this.mobileMenu) {
                         this.addLinkEvent();
                         this.addClickEvent();
                    } 
                    
                    return this;
               }
          }
     }

     function navBarFixed() {
          new class NavBarFixed {
               constructor() {
                    this.container = document.querySelector('.header-container');
                    this.init();
               }
          
               scrollEventHeader() {
                    const container = this.container;
          
                    const fixedHeader = () => {
                         if (window.scrollY >= 50) {
                              container.classList.add('fixed');
                         } else {
                              container.classList.remove('fixed');
                         }
                    };

                    window.addEventListener('scroll', fixedHeader);
               }
          
               init() {
                    this.scrollEventHeader();

                    return this;
               }
          
          }
     }

     return (
          <div className="header-container">
               <header>
                    <h1>Finance</h1>
               </header>
               <nav>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" className="mobile-menu">
                         <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"/>
                    </svg>
                    <ul className="nav-list">
                         <li>
                              <Link to="/">Home</Link>
                         </li>
                         <li>
                              <Link to="/services">Servi??os</Link>
                         </li>
                         <li>
                              <Link to="/category">Categorias</Link>
                         </li>
                    </ul>
               </nav>
          </div>
     )
}