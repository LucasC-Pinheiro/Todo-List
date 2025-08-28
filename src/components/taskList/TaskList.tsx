import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Animated, { FadeInDown, FadeOutRight } from "react-native-reanimated";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

interface TaskListProps {
  tasks: Task[];
  onToggleComplete?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onRemove }: TaskListProps) {
  return (
    <View style={{ marginTop: 24 }}>
      {tasks.map((task) => (
        <Animated.View
          key={task.id}
          entering={FadeInDown.duration(600)}
          exiting={FadeOutRight}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#262626",
            borderRadius: 6,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 10,
          }}
        >
          
          {/* Bolinha para marcar como concluído */}
          <TouchableOpacity
            onPress={() => onToggleComplete && onToggleComplete(task.id)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: task.completed ? "#2563eb" : "#808080",
              backgroundColor: task.completed ? "#2563eb" : "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >

            {task.completed && (
              <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>
            )}
          </TouchableOpacity>

          {/* Texto da tarefa */}
          <Text
            style={{
              flex: 1,
              color: task.completed ? "#808080" : "#F2F2F2",
              textDecorationLine: task.completed ? "line-through" : "none",
              fontSize: 16,
            }}
          >
            {task.text}
          </Text>

          {/* Botão de remover */}
          <TouchableOpacity onPress={() => onRemove && onRemove(task.id)}>
            <Text style={{ color: "#e63946", fontSize: 20, fontWeight: "bold", marginLeft: 12 }}>
              ×
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}
