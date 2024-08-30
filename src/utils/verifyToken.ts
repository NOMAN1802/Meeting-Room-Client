import {jwtDecode} from "jwt-decode"
import { CustomJwtPayload } from "../types";

export const verifyToken = (token: string) =>{
    return jwtDecode<CustomJwtPayload>(token);
}