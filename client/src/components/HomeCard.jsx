import React from 'react'
import logo from '../assets/gLogo.png'

export default function HomeCard() {
  return (
    <div className='homeCard'>
      <div className='rightPart'>
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className='leftPart'>
        <div>
          <h1>مفقوداتي</h1>
          <h3>ضيعت إشي أو لقيت إشي ضايع ؟</h3>
        </div>
        <p>المنصة الأولى من نوعها, <strong>مجاناً</strong>!</p>
      </div>
    </div>
  )
}
