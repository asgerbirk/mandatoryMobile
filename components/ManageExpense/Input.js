import {Text, TextInput, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constant/styles";

export const Input = ({label, textInputConfig}) => {

    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMulti)
    }

    return <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}/>
    </View>
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label:{
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMulti:{
        minHeight: 100,
        textAlignVertical: "top"
    }
})