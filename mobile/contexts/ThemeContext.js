import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('none');

    AsyncStorage.getItem('theme')
        .then(theme => {
            if (theme == null) {
                changeTheme('light').then(res => console.log('user theme has fallen back to default value'));
            } else {
                setTheme(JSON.parse(theme));
            }
        })
        .catch((e) => {
            console.log(`the user does not have saved theme - ${e}`);
            setTheme('light');
        });

    const changeTheme = async (theme) => {
        try {
            const jsonValue = JSON.stringify(theme)
            await AsyncStorage.setItem('theme', jsonValue)
            setTheme(theme);
        } catch (e) {
            console.log(`Saving theme got wrong .. ${e}`);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};