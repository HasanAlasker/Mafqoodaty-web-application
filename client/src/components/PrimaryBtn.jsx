import { RiPhoneLine } from '@remixicon/react'
import React, { useState } from 'react'

export default function PrimaryBtn({userPhone}) {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(userPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('فشل نسخ الرقم');
    }
  }

  return (
    <button className='priBtn bold' onClick={copyNumber}>
      <p className='small'>{copied ? 'تم نسخ الرقم!' : 'تواصل مع الناشر'}</p>
      <RiPhoneLine />
    </button>
  )
}