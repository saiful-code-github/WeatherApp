import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com"
})

///get api
export const getApi = () => {
    return api.get("/users")
}

//post api
export const postApi = (user) => {
    return api.post(`/users`, user)
}

//put api
export const putApi = (id, user) => {
    return api.put(`/users/${id}`, user)
}

//delete api
export const deleteApi = (id) => {
    return api.delete(`/users/${id}`)
}