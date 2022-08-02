import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { LoginDTO } from "../models/LoginDTO";
import { UserDTO } from "../models/UserDTO";
import { store } from "./store";
import { history } from "../..";

export interface GetLoginResponse{
    data: LoginD|null;
}

interface LoginD{
    Login: UserDTO;
}

export interface errorResponse{
    errors: error[];
    data:LoginD|null;
}

interface error{
    errors:errorObject[];
}

interface errorObject{
    message:string;
    path: string[];
}

export default class UserStore{
    userDto: UserDTO | null = null;
    refreshTokenTimeout: any;
    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.userDto;
    }

    login = async (LoginFormCollection: {}) => {
        try {
            const user:GetLoginResponse|errorResponse = await agent.Account.login(LoginFormCollection);
            if(user.data){
                store.commonStore.setToken(user.data.Login.Token!);

                
                //  this.startRefreshTokenTimer(user);
              runInAction(() =>{
                this.userDto = {
                    UserName:user.data?.Login.UserName!,
                    Token:user.data?.Login.Token!,
                    Expiry:user.data?.Login.Expiry!
                }
              } );
              history.push('/activity');
              window.location.reload();
            }

         
           // console.log(user);
            return user;
        }
        catch (error) {
            throw error;
        }


    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.userDto = null;
        history.push('/');

    }
}