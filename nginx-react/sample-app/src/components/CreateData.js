import React, {useState} from 'react';
import postSignUp from '../apis/postSignUp';

function CreateData() {
    const [generatedData, setGeneratedData] = useState(null);
    
  return (
    <div >
        <h1>CreateData</h1>
        <button 
          onClick={async () => {
            let data = await postSignUp();
            setGeneratedData(data);
            console.log("DATA IS: ", data);
          }}>
          Generate Dummy Data
        </button>
        {generatedData !== null ? <div><pre>{JSON.stringify(generatedData, null, 2) }</pre></div> : null}
    </div>
  );
}

export default CreateData;
