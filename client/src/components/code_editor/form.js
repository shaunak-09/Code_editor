
import { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import axios from 'axios';
import {toast} from 'react-toastify'
import { server } from "../../server";
// import Editor from "@monaco-editor/react";
const Form= () => {
  const [formData, setFormData] = useState({
    username: '',
    language: 'cpp',
    sourceCode: '',
    stdin: ''
  });
  // const [languages, setLanguages] = useState([])
  // const [languageid, setLanguageId] = useState([])

  // useEffect(()=>{
  //   const langget=async()=>{
          
  //   const options = {
  //     method: 'GET',
  //     url: 'https://judge0-ce.p.rapidapi.com/languages',
  //     headers: {
  //       "X-RapidAPI-Key": process.env.JUDGE_KEY,

  //     }
  //   };
    
  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //     setLanguages(response.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // langget()
  // },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    // console.log(formData);
    try{
      let langId=0;
      switch (formData.language) {
        case 'py':
          langId = 71;
          break;
        case 'js':
          langId = 63;
          break;
        case 'java':
          langId = 62;
          break;
        case 'cpp':
          langId = 52;
          break;
        default:
          langId = null;
      }
      if(langId==null)
      toast.error("Language is not Allowed");
    else{
      console.log(langId);
      const result=await axios.post(`${server}/submit`,formData,{
        params:{langId}
      })
      console.log(result);
      toast.success(result?.data?.message)

    }
    
    }
    catch(err){
      console.log(err);
      toast.error(err?.data?.error)
    }
  }
  return (
    <div>
      <div class="h-[100%] mx-auto bg-gray-900 p-5">
        <div className="flex flex-wrap mb-1">
          <div className="w-full md:w-1/2 md:pr-2 md:mb-0">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              className="w-full rounded bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block min-w-0 text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bonnie Green"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-2">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {/* {
                languages.map((lang,ind)=>{
                  return(
                    <option key={ind}  value={lang.name}>{lang.name}</option>
                  );
                })
              } */}
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-wrap mb-1">
          <div className="w-full md:w-2/3 md:pr-2 mb-1 md:mb-0">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Source Code</label>
            <CodeEditor
              value={formData.sourceCode}
              // data-color-mode="dark"
              language={formData.language}
              name="sourceCode"
              onChange={handleInputChange}
              className="block p-2.5 w-full h-[100%] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              padding={15}
              style={{
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
         
          </div>
          <div className="w-full md:w-1/3 md:pl-2">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Standard Input</label>
            <textarea
              rows="4"
              value={formData.stdin}
              onChange={handleInputChange}
              name="stdin"
              className="block p-2.5 w-full h-[70vh] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form;
