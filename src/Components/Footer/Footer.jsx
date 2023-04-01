import React from 'react'
import style from './Footer.module.css';
export default function Footer() {
  return (
    <>
    <div className={`px-5 ${style.footer}`}>
        <a href='/signup' className={`${style.joincom} me-3`}>JOIN OUR COMMUNITY</a>
        <a href='#' className={`${style.joincom} me-3`}>Contact Us</a>
        <a href='#' className={`${style.joincom} me-3`}>Terms of use</a>
        <a href='#' className={`${style.joincom}`}>Privacy policy</a>
    </div>
    <div className={`${style.bottomFooter} text-white px-5`}>
       <div className='p-1'>
        <p className='pt-2'>Developed By Wajd Alasttal © Copyright 2023</p>
        </div> 
    </div>
    </>
  )
}
