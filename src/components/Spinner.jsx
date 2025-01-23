import React from 'react'
import { ScaleLoader } from 'react-spinners'


export default function Spinner() {
  return (
    <div className='flex justify-center items-center'>
    <ScaleLoader size={120} color="#0a8ab6"  />
    </div>
  )
}
