import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";


export default function Header() {

     useEffect(() => {
          class MobileNavBar {
               constructor(mobileMenu, navList, navLinks) {
                    this.mobileMenu = document.querySelector(mobileMenu);
                    this.navList = document.querySelector(navList);
                    this.navLinks = document.querySelectorAll(navLinks);
                    this.activeClass = "active";
          
                    this.handleClick = this.handleClick.bind(this);
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
          class NavBarFixed {
               constructor(containerSelector) {
                    this.container = document.querySelector(containerSelector);
               }
          
               scrollEventHeader() {
                    const container = this.container;
          
                    window.onload = function(e) {
                         const offset = container.offsetTop;
                         const menu = container;
          
                         document.addEventListener('scroll', function() {
                              if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) {
                                   menu.style.position = 'fixed'; 
                              } else {
                                   menu.style.position = 'static';
                              }
                         });
                    }
               }
          
               init() {
                    this.scrollEventHeader();

                    return this;
               }
          
          }

          const mobileNavBar = new MobileNavBar('.mobile-menu', '.nav-list', '.nav-list li');
          mobileNavBar.init();

          const navBarFixed = new NavBarFixed('.header-container');
          navBarFixed.init();

          return;
     }, []);

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
                              <Link to="/services">Serviços</Link>
                         </li>
                         <li>
                              <Link to="/category">Categorias</Link>
                         </li>
                    </ul>
               </nav>
          </div>
     )
}