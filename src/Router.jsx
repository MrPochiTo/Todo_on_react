import { useEffect, useState } from "react"

const mathPath = (path, route)=> {
    const pathPath = path.split('/')
     const routePath = route.split('/')
     console.log(pathPath)
     console.log(routePath)
     if(pathPath.length !== routePath.length){
        return null
     }

     const params = {}
     for(let i = 0; i<routePath.length; i++){
        if(routePath[i].startsWith(':')){
            const paramName = routePath[i].slice(1)
            params[paramName] = pathPath[i]
        }else if(routePath[i] !== pathPath[i]){
            return null
        }
        
     }
     return params
}
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

    for(const route in routes) {
        const params = mathPath(path,route)
        if(params) {
            const Page = routes[route]
            return <Page params={params}/>
        }
       
    }

    const NotFound = routes['*']
    return <NotFound />
}

export default Router