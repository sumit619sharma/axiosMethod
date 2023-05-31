import { default as axios } from "axios";

// AXIOUS GLOBALS
axios.defaults.headers.common['X_Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.U1lMVEVMT0c3VzJZTlNJNkRQU0dGVVhONkhIWEZMQTYzQ0tB'



// GET REQUEST
function getTodos() {
  console.log('GET Request');
  
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then((res)=> showOutput(res))
  .catch((err)=> showOutput(err));
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
 
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    
      title: "sumit",
      branch: "infromation",
      completed: true,
    
  }).then((res)=> showOutput(res))
  .catch((err)=> showOutput(err));

}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');

  axios.put('https://jsonplaceholder.typicode.com/todos/1',{
    
      title: "sumitxsharma",
      company: "Google",
      
    
  }).then((res)=> { console.log(res), showOutput(res)})
  .catch((err)=>{ console.log(res), showOutput(err)});

}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then( axios.spread((todos,post)=>{
    console.log(todos);
     showOutput(post);
  } 
  ) );
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'someToken'
  }
};
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    
      title: "sumit",
      branch: "infromation",
      completed: true,
    
  }, config).then((res)=> showOutput(res))
  .catch((err)=> showOutput(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
const options = {
  method:'post',
  url: 'https://jsonplaceholder.typicode.com/todos',
  data:{
    title: "hello World"
  },
  transformResponse: axios.defaults.transformResponse.concat(data=>{
    data.title  =data.title.toUpperCase();
  return data;
  })
}

}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=5')
  .then((res)=> showOutput(res))
  .catch((err)=>{
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status===404){
        alert("Error: Page Not Found");
      }
    } else if(err.request){
      console.log(err.request);
    } else{
      console.log(err.message);
    }
  });

}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
const source  =axios.CancelToken.source();
axios.get('https://jsonplaceholder.typicode.com/todos',{
  cancelToken: source.token  
})
.then(res=> showOutput(res))
.catch(thrown =>{
  if(axios.isCancel(thrown)){
    console.log('Request canceled', thrown.message)
  }
});
if(true){
  source.cancel('Request canceled!')
}
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config=>{
    console.log(`${config.method} request send to 
    ${config.url} at ${new Date().getTime()}`);
    return config;
  }, 
  error=>{
    return Promise.reject(error);
  }
)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments').then( res=> showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
