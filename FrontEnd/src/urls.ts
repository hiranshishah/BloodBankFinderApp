import { environement } from "./environment";
export const urls={
    bloodbankUrl:`${environement.baseurl}/api/BloodBank`,
    userUrl:`${environement.baseurl}/api/User`,
    searchUrl:`${environement.baseurl}/api/Search`,
    loginUrl:`${environement.baseurl}/api/User/login`,
    signupUrl:`${environement.baseurl}/api/User/signup`
};