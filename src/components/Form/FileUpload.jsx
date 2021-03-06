import React, {useRef} from 'react'

const FileUpload = ({file, setFile}) => {
    const inputFile = useRef();
    return (
        <div>
         <input className="hidden" type='file' multiple={false} ref={inputFile} onChange={e=> {setFile(e.target.files[0])}}/>
         <div className="flex items-center justify-center">
             <span className='max-w-xl flex-1 rounded-l-xl border-2 border-blue-600 p-2 truncate bg-white'>{file.name}</span>
                <button className="outline-none tracking-wider border-2 rounded-r-xl p-2 border-blue-600 bg-blue-600 active:bg-blue-700 active:border-blue-700 text-white"
                onClick={()=>inputFile.current.click()}>Browse</button>
         </div>
        </div>
    )
}

export default FileUpload
