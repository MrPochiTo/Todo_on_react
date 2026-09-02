import { useEffect, useState } from "react"

export const useRoute = ()=> {
const [path, setPath] = useState(window.location.pathname)
useEffect(() => {
    const onPathChange = () =>{
        setPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPathChange)
    return () => {
        window.removeEventListener('popstate', onPathChange)
    }
}, [])
return path
}

const Router = (props) => {
    const {routes} = props
    const path = useRoute()

    if(path.startsWith('/tasks/')) {
        const id = path.replace('/task/', '')
        const TaskPage = routes['/task/:id']
        return <TaskPage params={{id}}/>
    }
    const Page = routes[path] ?? routes['*']
    return <Page />
}

export default Router