import React, { useState } from "react";

import axios from "axios";

const styles = {
    fileDropper: {
                  border: '1px solid black', 
                  padding: 20, 
                  height: '200px', 
                  backgroundColor: 'red',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  position: 'relative',
                  
                  input: {
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'blue',
                        transition: '0.5s'
                      }
                  }
                }
}




const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요.");

    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0];
        //console.log({imageFile});
        setFile(imageFile);
        setFileName(imageFile.name);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        //backend로 파일 전송
        //form-data

        const formData = new FormData();
        formData.append("imageTest", file); //key value

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(res);
        } catch (err) {}
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={styles.fileDropper}>
                <label htmlFor="image">{fileName}</label>
                <input style={styles.fileDropper.input} id="image" type="file" onChange={imageSelectHandler}></input>
            </div>
                <button type="submit">업로드</button>
            
        </form>
    );
};



export default UploadForm;
