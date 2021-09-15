import React from 'react'
import {convertBytes} from '../helpers.js'
import moment from 'moment'
import { saveAs } from "file-saver";

const Content = ({oneFile}) => {

    const saveFile = () => {
        saveAs(`https://ipfs.infura.io/ipfs/${oneFile.fileHash}`, oneFile.fileName)
    }

    return (
        <div className='grid grid-cols-1 xs:grid-cols-2 gap-2'>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Name</h1>
             <h1 className='truncate'>{oneFile.fileName}</h1>
         </div>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Description</h1>
             <h1 className='truncate'>{oneFile.fileDescription}</h1>
         </div>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Type</h1>
             <h1 className='truncate'>{oneFile.fileType}</h1>
         </div>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Size</h1>
             <h1 className='truncate'>{convertBytes(oneFile.fileSize)}</h1>
         </div>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Upload Time</h1>
             <h1 className='truncate'>{moment.unix(oneFile.uploadTime).format('lll')}</h1>
         </div>
         <div className='flex flex-col'>
             <h1 className='font-bold'>Uploader</h1>
             <h1 className='truncate'>{oneFile.uploader}</h1>
         </div>
        <button className='grid col-span-1 xs:col-span-2 mt-2 tracking-wide rounded-xl p-2 bg-green-600 active:bg-green-700 font-semibold uppercase'
        onClick={saveFile}>Download</button>
        </div>
    )
}

export default Content
