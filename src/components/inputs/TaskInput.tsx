import { View, TouchableOpacity, Text } from "react-native";
import { TextInputComponent } from "./TextInputComponent";

import Animated, { FadeInDown } from "react-native-reanimated";

type TaskInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
};

export function TaskInput({ value, onChangeText, onAdd }: TaskInputProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <TextInputComponent
          value={value}
          onChangeText={onChangeText}
          placeholder="Digite sua tarefa..."
        />
      </View>
      <TouchableOpacity
        onPress={onAdd}
        style={{
          backgroundColor: "#2563eb",
          marginLeft: 8,
          width: 48,
          height: 48,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
