'use client';

import React, { useState } from 'react'

function FileUpload() {
    const [file, setFile] = useState<File>();

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!file) return;

        try{
            const data = new FormData();
            data.set('file', file);
            console.log('start')
            const res = await fetch('/api/upload', {
                method:'POST',
                body:data
            })
            console.log('end')
            if(!res.ok) throw new Error(await res.text())
        } catch(e:any){
            console.error(e)
        }
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
            type="file"
            name='file'
            onChange={(e)=> setFile(e.target.files?.[0])}
         />
         <input type="submit" value="upload" />
      </form>
    </div>
  )
}

export default FileUpload;
