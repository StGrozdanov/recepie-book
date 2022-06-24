import { Text, View, TouchableOpacity } from "react-native";
import { settingsStyles } from "./SettingsStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette"
import { useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import Appearance from "../Appearance/Appearance";

export default function Settings() {
    const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);
    const { theme } = useThemeContext();

    function appearanceHandler() {
        showAppearanceOptions ? setShowAppearanceOptions(false) : setShowAppearanceOptions(true);
    }

    return (
        <View style={settingsStyles.container}>
            <TouchableOpacity style={settingsStyles.touchable}>
                <FontAwesomeIcon icon={faPowerOff} size={26} style={settingsStyles[theme + 'Icon']} />
                <Text style={settingsStyles[theme + 'LogoutText']}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={settingsStyles.touchable} onPress={appearanceHandler}>
                <FontAwesomeIcon icon={faPalette} size={26} style={settingsStyles[theme + 'Icon']} />
                <Text style={settingsStyles[theme + 'LogoutText']}>Appearance</Text>
            </TouchableOpacity>
            {showAppearanceOptions && <Appearance />}
        </View>
    );
}