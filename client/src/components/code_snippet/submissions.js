import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
const Page2 = () => {
    const [submissions, setSubmissions] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get(`${server}/snippets`)
            console.log(response?.data?.message);
            
            setSubmissions(response?.data?.data)
            

            }
            catch(err){
                console.log(err?.response?.data?.error)
            }
            
        }
        fetchData()
    },[])
    
    return (
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Language
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stdin
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Source Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Output
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions?.length!=0 &&submissions?.map((submission, ind)=>(
                            <>
                            <tr key={`sub${ind}`} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {submission.username}
                                </th>
                                <td class="px-6 py-4">
                                    {submission.language}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.stdin}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.source_code}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.output}
                                </td>
                                <td class="px-6 py-4">
                                    {submission.timestamp}
                                </td>
                            </tr>
                    
                            </>
                        ))}
                        
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Page2;