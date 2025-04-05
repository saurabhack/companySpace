const userTokenMap=new Map()
export function setUser(id,user){
    userTokenMap.set(id,user)
}
export function getUser(id){
    return userTokenMap.get(id)
}