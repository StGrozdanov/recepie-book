import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';

export default function EditAction({ collection }) {
    return (
        <TouchableOpacity style={actionStyles.action}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPenToSquare} />
            <Text style={actionStyles.text}>Edit {collection}</Text>
        </TouchableOpacity>
    );
}