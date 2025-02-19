import axios from 'axios';
const serverUrl = 'http://localhost:5000';

class aiService{
    getChatBotResponse(query){ 
        return axios.post(serverUrl + '/response', { query })
    }
    
    updateDatabase(pattern,intent){
        return axios.put(serverUrl+'/updateDatabase',{pattern,intent})
    }
}

export default new aiService();