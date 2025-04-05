import {jwt} from "jsonwebtoken"

function decodeToken(token){
    const token = jwt.decode(token)
    console.log("token is here == ",token)
    return token
}

export default decodeToken