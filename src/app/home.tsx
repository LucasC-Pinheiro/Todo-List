import { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";

import { TaskList, Task } from "@/components/taskList/TaskList";
import { TaskInput } from "@/components/inputs/TaskInput";
import TodoCategoriesScreen from "@/components/screens/TodoCategoriesScreen";

interface Category {
  id: string;
  name: string;
}

export default function Home() {
  // Categorias iniciais
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Variados" },
  ]);

  // Tarefas por categoria
  const [tasksByCategory, setTasksByCategory] = useState<{ [key: string]: Task[] }>({
    "1": [],
    "2": [],
    "3": [],
  });
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [input, setInput] = useState("");

  // Adicionar nova categoria
  function handleAddCategory(name: string) {
    const newId = Date.now().toString();
    const newCategory = { id: newId, name };
    
    setCategories(prev => [...prev, newCategory]);
    setTasksByCategory(prev => ({ ...prev, [newId]: [] }));
    setSelectedCategory(newId);
  }

  // Adicionar tarefa na categoria selecionada
  function handleAddTask() {
    if (!input.trim()) return;
    setTasksByCategory(prev => ({
      ...prev,
      [selectedCategory]: [
        ...(prev[selectedCategory] || []),
        { id: Date.now().toString(), text: input, completed: false }
      ]
    }));
    setInput("");
  }

  // Marcar/desmarcar tarefa
  function handleToggleComplete(id: string) {
    setTasksByCategory(prev => ({
      ...prev,
      [selectedCategory]: (prev[selectedCategory] || []).map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  }

  // Remover tarefa
  function handleRemoveTask(id: string) {
    setTasksByCategory(prev => ({
      ...prev,
      [selectedCategory]: (prev[selectedCategory] || []).filter(task => task.id !== id)
    }));
  }

  // Remover categoria
  function handleRemoveCategory(id: string) {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setTasksByCategory(prev => {
      const newTasks = { ...prev };
      delete newTasks[id];
      return newTasks;
    });
    
    // Se a categoria removida era a selecionada, seleciona a primeira categoria disponível
    if (selectedCategory === id && categories.length > 1) {
      const remainingCategories = categories.filter(cat => cat.id !== id);
      setSelectedCategory(remainingCategories[0]?.id || "1");
    }
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={80} // ajuste caso necessário
    >
    <View style={{ flex: 1, backgroundColor: "#1A1A1A", justifyContent: "flex-end" }}>
      {/* Barra de categorias */}
      <TodoCategoriesScreen
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        categories={categories}
        onAddCategory={handleAddCategory}
        onRemoveCategory={handleRemoveCategory}
      />
      {/* Lista de tarefas da categoria selecionada */}
      <View style={{ flex: 1 }}>
        <TaskList
          tasks={tasksByCategory[selectedCategory] || []}
          onToggleComplete={handleToggleComplete}
          onRemove={handleRemoveTask}
        />
      </View>
      {/* Input fixo no rodapé */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <TaskInput
          value={input}
          onChangeText={setInput}
          onAdd={handleAddTask}
        />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
