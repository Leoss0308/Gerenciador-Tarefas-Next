

import React, {MouseEvent, useState} from "react";
import {executeRequest} from "../services/apiServices";
import {NextPage} from "next";
import {string} from "prop-types";
import {AccessTokenProps} from "../types/AccessTokenProps";

//Gerenciamento de state por hooks

export const Login:NextPage<AccessTokenProps> = ({setAccessToken}) => {

    //const = constante, contexto global
    //let variável, contexto local
    //var variável, contexto global (não usar)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const doLogin = async (evento: MouseEvent) => {
        try {
            evento.preventDefault();
            setError('');
            //Early return: testar os caminhos de erro e retornar anteriormente
            if(!login || !password){
                return setError('Favor informar usuário e senha!');
            }

            const body = {login, password};

            const result = await executeRequest('login', 'POST', body);
            if(!result || !result.data){
                return setError('Ocorreu um erro ao processar login, tente novamente!');
            }

            const {name, email, token} = result.data;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            setAccessToken(token);
        }catch (e: any){
            console.log(e);
            if(e?.response?.data?.error){
                return setError(e?.response?.data?.error);
            }

            return setError('Ocorreu um erro ao processar login, tente novamente!');
        }
    }
    //Tag específica do React quando não se quer usar div, por exemplo. (<>)
    return (
        // <>
            <div className="container-login">
                <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
                <form>
                    <p className="error">{error}</p>
                    <div className="input">
                        <img src="/mail.svg" alt="Informe seu Login"/>
                        <input type="text" placeholder="Login" value={login} onChange={evento => setLogin(evento.target.value)}/>
                    </div>
                    <div className="input">
                        <img src="/lock.svg" alt="Informe sua senha"/>
                        <input type="password" placeholder="Senha" value={password} onChange={evento => setPassword(evento.target.value)}/>
                        {/*<img className="password" src="/eye.svg" alt="Ver senha senha"/>*/}

                    </div>
                    <button onClick={doLogin}>Login</button>
                {/*    Isso seria diferente de passar, por exemplo, doLogin() (nesse caso, seria como falar para executar a função quando o elemento carregasse*/}
                </form>
            </div>
        // </>
    );
}