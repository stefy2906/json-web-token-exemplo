import { jwVerify } from "jose";
import decode from "jsonwebtoken"

const validateToken = async(token) => {
    const secret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJjk1NjkxNTQyfQ.EG-A9n08TjSSm2affCX5Bl3yRpDbIytMIO5j2iMalLA"
    try {
        /*const isTokenValidate = await jwtVerify(token, new TextEncode())
        if(isTokenValidate){
            return true
        }*/
        const isTokenValidate = await decode(token);
        if(isTokenValidate){
            return true
        }
    } catch{
        return false;
    }
}   

export { validateToken };