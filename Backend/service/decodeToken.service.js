import jwt from "jsonwebtoken"

function decodeToken(token){
    const decodedToken = jwt.decode(token)
    console.log("token is here == ",token)
    return decodedToken
}

export default decodeToken