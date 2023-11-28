'use server'
import {cookies} from 'next/headers';

const url = "https://localhost:4000";

const getUserAuthenticated = async (user) => { 
   try{//armazena os objetos
  const responseOfApi = await fetch(url +  "/logar",
     {
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body:JSON.stringify(user)
     }
  );
 const userAuth = await responseOfApi.json();
 return userAuth;
} catch {
   return null;
 }
}

//lista os usuários
const getUsers = async () =>{
 try {
   const respondeOfApi = await fetch(`${url}/user${id}`,{
      next: {revalidate: 10}
   })
   const ListaUsers = responseOfApi.json()

   return ListaUsers
 } catch {

   return null;
 }
}

//autenticar
const updateUser = async (user, id) => {
   const token = cookies().get('token')?.value;
   try {
      const respondeOfApi = await fetch(`${url}/user${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'Aplication/json',
            Cookie: `token=${token}`
         },
         body: JSON.stringify(user)
      });
      const userSave = await respondeOfApi.json();
      return userSave;
   } catch {
      return null;
   }
}


const postUser = async (user) => {
   try {
      const respondeOfApi = await fetch(url + "/user",{
         method: 'POST',
         headers: {
            'Content-Type': 'Aplication/json'
          },
         body: JSON.stringify(user)
      });
   } catch {
      return null;
   }
}


export { getUsers, getUserAuthenticated, postUser, updateUser };
