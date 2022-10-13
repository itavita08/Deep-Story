export default class APIService{
  // Insert an article
  static InsertArticle(body){
      return fetch('http://127.0.0.1:5000/add',{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(error => console.log(error))
  }

}