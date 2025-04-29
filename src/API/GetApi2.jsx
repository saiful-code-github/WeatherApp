import { useEffect, useState } from "react"
import { deleteApi, getApi, postApi, putApi } from "./Api";

export const GetApi2 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newData, setNewData] = useState({
        email:""
    });
    const [editId, setEditId] = useState(null)
    // handleInput
    const handleInput = (e) => {
        const {name,value} = e.target;
        setNewData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const getDta = async() => {
        setLoading(true);
        setError(false)
        try {
            const res = await getApi();
            if(res.status === 200){
                console.log(res.data);
                setData(res.data);
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setError("Fetch data are faild", error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
         getDta()
    },[])
    // handleDelete
    const handleDelete = async(id) => {
           try {
               const res = await deleteApi(id);
               if(res.status === 200){
                  setData((prev)=> prev.filter((item)=> item.id !== id))
               }
           } catch (error) {
              console.log(error)
           }
    }
    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editId){
            updateData();
        }else{
            addData()
        }
    }
    // addData
    const addData = async() => {
        if(!newData.email.trim()) return alert("please fill the input");
       try {
          const res = await postApi({newData})
          if(res.status === 200){
            const newData2 = {
                ...newData,
                id: data.length ? data [data.length - 1].id + 1 : 1
            }
            setData((prev)=> [...prev, newData2]);
            setEditId(null)
            setNewData({
                email: ""
            })
          }
       } catch (error) {
          console.log(error)
       }
    }
    const handleEdit = (item) => {
        setEditId(item.id);
        setNewData({
            ...item,
            email: item.email
        })
    }
    // updateData
    const updateData = async() => {
        if(!newData.email.trim()) return alert("please update your data")
        try {
            const res = await putApi(editId, {newData});
            if(res.status === 200) {
                setData((prev)=> prev.map((item)=> item.id === editId ? {...item, ...newData} : item));
                setEditId(null)
                setNewData({
                    email: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
           <div className="mt-[20px]">
            <div className="block mx-auto text-center mb-6">
                <input type="email" placeholder="Enter Your mail" className="outline-0 w-[23%] text-white py-[6px] pl-[6px] border-b-2 border-sky-500" name="email" value={newData.email}
                 onChange={handleInput}/>
                 <button className={`${editId ? "bg-orange-600" : "bg-blue-700"} text-white py-[6px] px-[10px] cursor-pointer`} onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
            </div>
               {loading && <p className="text-center text-white my-[10px]">Loading...</p>}
               {error && <p className="text-red-700 text-center mt-[10px]">{error}</p>}
               <ul>
                  {data.map((item,i)=>{
                    const {email,id} = item;
                    return (
                        <li key={i} className="flex flex-col justify-center text-white mb-[10px]"
                         style={{alignItems: "center"}}>
                            <div className="flex">
                            <h4 className="mr-3"><b>{id}</b></h4>
                            <p>{email}</p>
                             <div className="flex justify-between">
                                 <button className="bg-blue-600 text-white py-[3px] px-[10px]
                                  ml-3 cursor-pointer" onClick={()=>handleEdit(item)}>Edit</button>
                                    <button className="bg-red-700 text-white ml-3 py-[3px] px-[10px]
                                  mr-3 cursor-pointer" onClick={()=> handleDelete(id)}>Delete</button>
                             </div>
                            </div>
                        </li>
                    )
                  })}
               </ul>
           </div>
        </div>
    )
}