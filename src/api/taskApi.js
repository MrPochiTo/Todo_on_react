const URL = 'http://localhost:3001/task'
const headers = {
                    'Content-Type': 'application/json',
                }
const taskApi = {
    getAll: ()=> {fetch(URL).then((res) => res.json())},
     add: (task)=> {fetch('http://localhost:3001/task', {
                method: 'POST',
                headers,
                body: JSON.stringify(newTask)
            }).then((res)=> res.json())},
      delete: ()=> { fetch(`${URL}${taskId}`, {
                method: 'DELETE',
            })},
       deleteAll: ()=> {},
        toggleComplete: ()=> {},
        
}