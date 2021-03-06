import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialUserState = {
    username: '',
    id: null,
    sessionToken: '',
    refreshToken: '',
    administrator: false,
    avatarUrl: '',
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    AsyncStorage.getItem('user')
        .then(user => {
            if (user == null) {
                return;
            } else {
                setUser(JSON.parse(user))
            }
        })
        .catch((e) => {
            console.log(`Something went wrong with the user auth context - ${e}`);
            setUser(initialUserState);
        });

    const login = async (authData) => {
        await AsyncStorage.setItem('user', JSON.stringify(authData));
        setUser(authData);
    }

    const logout = async () => {
        await AsyncStorage.setItem('user', JSON.stringify(initialUserState));
        setUser(initialUserState);
    };

    const userIsAuthenticated = async () => {
        const storageResponse = await AsyncStorage.getItem('user');
        const user = JSON.parse(storageResponse);

        return user !== null && Boolean(user.administrator) === true;
    }

    const getRefreshToken = async () => {
        const storageResponse = await AsyncStorage.getItem('user');
        const user = JSON.parse(storageResponse);

        return user.refreshToken;
    }

    const getUserToken = async () => {
        const storageResponse = await AsyncStorage.getItem('user');
        const user = JSON.parse(storageResponse);

        return user.sessionToken;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, userIsAuthenticated, getRefreshToken, getUserToken }}>
            {children}
        </AuthContext.Provider>
    );
}