import axios from 'axios'

class HelloWorldService {
    executeHelloService() {
        console.log('executed service')
        return axios.get('http://localhost:8080/account/hello');        
    }
}

export default new HelloWorldService()