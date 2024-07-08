import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { SignInModel, SignUpModel, UserModel } from '../models/auth';
import LoadingComponent from '../components/loading';
import ApiServices from '../api';
import cookies from "js-cookie";
import ErrorComponent from "../components/error";
const api = new ApiServices();



export type AuthContextTypes = {
    user: UserModel | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
    signOut: () => void;
    signIn: (data: SignInModel) => Promise<{ status: boolean, message: string }>;
    signUp: (data: SignUpModel) => Promise<boolean>;
} | null


export const authContext = createContext<AuthContextTypes>(null)

type PropsType = {
    children: ReactNode;
}

function AuthProvider(props: PropsType) {
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        checkSignIn()
    }, []);


    const checkSignIn = async () => {
        await api.Session()
            .then((res: any) => {
                setUser(res.data);
            })
            .catch((error: any) => {
                setUser(undefined);
            })
            .finally(() => {
                setLoading(false)
            })
    };


    const signOut = () => {
        setUser(undefined);
        cookies.remove("token");
    }

    const signIn = async (data: SignInModel): Promise<{ status: boolean, message: string }> => {
        try {
            const statusLogin = await api.SignIn(data)
            cookies.set("token", statusLogin.data.token, {
                expires: 1,
                sameSite: 'Strict',
                secure: true
            })
            const status: any = await api.Session()
                .then((res: any) => {
                    setUser(res?.data)
                    return { status: true, message: "login success." }
                })
                .catch((error: any) => {
                    setUser(undefined)
                    return { status: false, message: "login failed."}
                })
            return status
        } catch (error: any) {
            return { status: false, message: "login filed."}
        }
    }

    const signUp = async (data: SignUpModel): Promise<boolean> => {
        try {
            const statusRegister = await api.SignUp(data)
            return true
        } catch (error: any) {
            return false
        }
    }


    return (
        <authContext.Provider value={{
            user,
            setUser,
            signOut,
            signIn,
            signUp
        }}>
            {
                error ? (
                    <ErrorComponent />
                ) : (
                    loading ? (
                        <LoadingComponent />
                    ) : (
                        props.children
                    )
                )
            }
        </authContext.Provider>
    )
}

export default AuthProvider