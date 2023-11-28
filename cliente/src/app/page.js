"use client";
import { useState } from "react";
import  handlerAcessUser  from "./functions/handlerAcess";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../globals.css";


export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if (userAuth.token === undefined) {
        toast.error("Erro no nome ou senha!");
      }
      push("/pages/dashboard");
    } catch {
      refresh();
    }
  };
  return (
    <div>
      <form onSubmit={handlerLogin}>
      <h1>Login</h1>
        <input
          placeholder="Nome"
          name="name"
          type="text"
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        ></input>
        <input
          placeholder="Senha"
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        ></input>
        <button class="button-1"><span class="text">Entrar</span></button>
      </form>
      <ToastContainer/>
    </div>
  );
}
