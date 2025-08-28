import { TextInput } from "react-native";

export function TextInputComponent({ ...rest }){
    return(
        <TextInput 
            style={{
                height: 50,
                backgroundColor: "#262626",
                borderRadius: 6,
                padding: 16,
                fontSize: 16,
                color: "#F2F2F2",
            }}
            placeholderTextColor="#808080"
            {...rest}
        />
    )
}
