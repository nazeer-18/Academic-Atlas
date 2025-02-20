import axios from 'axios';
const serverUrl = 'http://localhost:5000';

class aiService{
    getChatBotResponse(query){ 
        return axios.post(serverUrl + '/response', { query })
    }
    
    updateDatabase(pattern,intent){
        return axios.put(serverUrl+'/updateDatabase',{pattern,intent})
    }

    generateSummaryAndUpdateDB(url,id){
        return axios.post(serverUrl + '/summarize' , {url,id})
    }
}

export default new aiService();