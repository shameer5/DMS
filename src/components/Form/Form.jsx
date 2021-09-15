import React from 'react';
import FileUpload from './FileUpload'
import { useForm } from "react-hook-form";

const Form =({file, setFile, account, active, setActive, fileUpload}) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        file.description = data.Description;
        file.account = account
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
        const buffer = Buffer(reader.result)
        setActive(!active)
        fileUpload(buffer)
        }
    };

    return (
        <>
            <div className={`${file.name !== 'Select a file...' && !active && `filter blur`} flex flex-col gap-3 rounded-xl justify-center`} >
                <h1 className='text-center font-semibold'>Want to upload your file to the decentralized web?</h1>
                <FileUpload className="mb-2" file={file} setFile={setFile}/>
                {file.name !== 'Select a file...' && (
                    <div className={`${file.name === 'Select a file...' && `hidden`} flex justify-center mt-2`}>
                        <button className={`${!active && `hidden`}`} onClick={()=>{setActive(false)}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                        </svg></button>
                    </div>)}
            </div>
            {file.name !== 'Select a file...' && (
            <div className={`flex items-center justify-center transition transform ease-in-out duration-1500 h-screen w-screen top-0 left-0 absolute z-10 ${active ? `translate-y-200` : `-translate-y-200`}`}>
            <div className={`flex flex-shrink mx-2 min-w-0 max-w-2xl flex-col bg-white p-2 rounded-xl shadow-custom transition transform ease-in-out duration-1500`}>
                <div className="flex justify-end">
                    <button onClick={()=>{setActive(!active)}}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg></button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 p-2'>
                    <div className='flex-col flex'>
                        <label className='mb-1 font-semibold'>Name</label>
                        <span type='text' className="truncate outline-none border-2 border-gray-400 rounded-xl p-2 bg-gray-200">{file.name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 font-semibold'>File type</label>
                        <span type='text' className="truncate outline-none border-2 border-gray-400 rounded-xl p-2 bg-gray-200">{file.type}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 font-semibold'>File size</label>
                        <span className="outline-none border-2 border-gray-400 rounded-xl p-2 focus:ring-2 bg-gray-200">{file.size}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 font-semibold'>File uploader address</label>
                        <span type='text' className="truncate outline-none border-2 border-gray-400 rounded-xl p-2 bg-gray-200">{account}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1 font-semibold'>Description</label>
                        <textarea type='text' rows='3' className="flex-span outline-none border-2 border-gray-400 rounded-xl p-2 focus:ring-2 " 
                        placeholder='Enter file description..'{...register("Description", {required: true })} />
                    </div>
                    <div className="flex justify-center">
                    <button 
                    className="mt-2 flex-1 rounded-xl border-2 p-2 border-new-100 tracking-wider bg-blue-600 active:bg-blue-700 text-white"
                    type="submit">UPLOAD</button>
                    </div>
                </form>
                
            </div>
            </div>
            )}
        </>
    )
}
export default Form