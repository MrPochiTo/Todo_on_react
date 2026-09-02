const URL = 'http://localhost:3001/task'
const headers = {
                    'Content-Type': 'application/json',
                }
const taskApi = {
    getAll: ()=> fetch(URL).then((res) => res.json()),

    getById: (id) => fetch(`${URL}/${id}`).then((res)=>{
        if(!res.ok) throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        return res.json()
    }),
     add: (task)=> fetch(URL, {
                method: 'POST',
                headers,
                body: JSON.stringify(task)
            }).then((res)=> res.json()),
      delete: (id)=>  fetch(`${URL}/${id}`, {
                method: 'DELETE',
            }),
       deleteAll: (tasks)=>   Promise.all(
                tasks.map(({id}) => {taskApi.delete(id)})
            ),
        toggleComplete: (Id, isDone)=> 
        fetch(`${URL}/${Id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({isDone})
            })
        
        
}

export default taskApi