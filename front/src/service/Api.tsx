import axios from 'axios' //se comunica com a API
//necessário para guardar o token  e conseguir passá-lo para outra screen
import AsyncStorage from '@react-native-async-storage/async-storage'
//endereço da API e headers para Accept para reconhcer JSON
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers:{
        Accept:'application/json',
    }
})
//interceptors é um atributo do axios para capturar o token se houver
api.interceptors.request.use(async (config)=>{
    //cria a variável que vai receber o token 
    const token = await AsyncStorage.getItem('token')
    if(token)
        //Bearer é usado para autenticar o usuário e recebe o token
        config.headers.Authorization = `Baerer ${token}`
    return config //string contendo o cabeçalho de autenticação com token
})
// para poder usar esse script em outro script
export default api