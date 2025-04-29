import { useEffect, useState } from "react"
import { deleteApi, getApi, postApi, putApi } from './Api';

export const GetApi = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newTodo, setNewTodo] = useState({
        email: ""
    })
    const [editId, setEditId] = useState(null);
    const validateEmail = (email) => {
        // Basic email regex pattern
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };
    //getdata
    const getData = async() => {
        setLoading(true);
        setError(false)
        try {
            const res = await getApi();
            if(res.status === 200){
                console.log(res.data);
                setUser(res.data);
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
         getData()
    },[])

    //handleDelete
    const handleDelete = async(id) => {
        try {
            const res = await deleteApi(id);
            if(res.status === 200) {
                setUser((prev)=> prev.filter((item)=> item.id !==id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    // handleChange
     const handleChange = (e) => {
       const {name, value} = e.target;
       setNewTodo((prev)=>({
        ...prev, 
        [name]: value
       }));
     }
    //  addData
    const addData = async() => {
        if(!newTodo.email.trim()) return alert("please fill the input");
        if(!validateEmail(newTodo.email)){
            return alert ("please vaild email")
        }
        try {
            const res = await postApi({ newTodo});
            if(res.status === 200){
                const newData = {
                    ...newTodo,
                    id:user.length ? user[user.length - 1].id + 1 : 1,
                }
                setUser((prev)=> [...prev, newData]);
                setEditId(null);
                setNewTodo({
                    email: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    // updateData
    const updateData = async() => {
        try {
            const res = await putApi(editId, {newTodo});
            if(res.status === 200){
                setUser((prev)=>
                  prev.map((item)=> item.id === editId ? {...item, ...newTodo} : item)
                )
                setEditId(null);
                setNewTodo({
                    email: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    //  handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editId){
            updateData()
        }else{
            addData()
        }
    }
    // editData 
    const editData = (item) => {
         setEditId(item.id);
         setNewTodo({
            ...item
         })
    }
    return (
        <div>
            <h1 className="text-center text-4xl font-bold capitalize bg-gradient-to-br to-sky-400 to-[50%] 
            from-purple-700 from-[15%] via-white via-[30%] textTransfrom my-[20px]">Todo App</h1>
            <div className="flex  justify-center mx-auto mb-[30px]">
                <input type="email" placeholder="Enter Your todo" name="email" value={newTodo.email} onChange={handleChange} className="outline-0 border-b-2 py-[10px] text-white border-sky-500"/>
                <button className={`${editId ? "bg-orange-600" : "bg-blue-700"} text-white py-[5px] px-[10px] cursor-pointer`} onClick={handleSubmit}>
                    {editId ? "Update" : "Add"}</button>
            </div>
             {loading && <p className="text-center capitalize font-bold text-white">Loading....</p>}
             {error && <p className="text-red-700 font-semibold capitalize text-center mb-[20px]">{error}</p>}
             <ul>
                {user.map((item, index)=>{
                       const {email,id} = item;
                       return (
                        <li key={index} className="mb-3">
                        <div className="flex justify-center mx-auto">
                             <h4 className="font-bold mr-2 text-white">{id}</h4>
                             <h3 className="text-white">{email}</h3>
                             <button className="ml-2 mr-3 bg-blue-600 cursor-pointer py-[2px] px-[10px] text-center text-white" onClick={()=> editData(item)}>Edit</button>
                             <button onClick={()=>handleDelete(id)} className="bg-red-700 text-white cursor-pointer capitalize text-center py-[3px] px-[10px]">Delete</button>
                        </div>
                    </li>
                       )
                    })}
             </ul>
        </div>
    )
}