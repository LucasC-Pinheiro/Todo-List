import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AddCategoryModal } from "@/components/modals/AddCategoryModal";
import { RemoveCategoryModal } from "@/components/modals/RemoveCategoryModal";

interface Category {
  id: string;
  name: string;
}

interface Props {
  selected: string;
  onSelect: (id: string) => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onRemoveCategory: (id: string) => void;
}

export default function TodoCategoriesScreen({ 
  selected, 
  onSelect, 
  categories, 
  onAddCategory,
  onRemoveCategory 
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [categoryToRemove, setCategoryToRemove] = useState<string | null>(null);

  const handleAddCategory = (name: string) => {
    onAddCategory(name);
    setModalVisible(false);
  };

  const handleOpenRemoveModal = (id: string) => {
    setCategoryToRemove(id);
    setRemoveModalVisible(true);
  };

  const handleRemove = () => {
    if (categoryToRemove) {
      onRemoveCategory(categoryToRemove);
      setRemoveModalVisible(false);
      setCategoryToRemove(null);
    }
  };

  return (
    <View style={{ marginTop: 16 }}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            style={{
              backgroundColor: selected === item.id ? "#2563eb" : "#262626",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              marginRight: 8,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.name}</Text>
            <TouchableOpacity className="" onPress={() => handleOpenRemoveModal(item.id)}>
              <Text style={{ color: "#e63946", marginLeft: 10 }}>🗑️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "#15803d",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              marginRight: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>+</Text>
          </TouchableOpacity>
        )}
      />

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCategory={handleAddCategory}
      />

      <RemoveCategoryModal
        visible={removeModalVisible}
        onClose={() => setRemoveModalVisible(false)}
        onRemoveCategory={handleRemove}
        categoryName={categoryToRemove ? categories.find(cat => cat.id === categoryToRemove)?.name : ""}
        taskCount={0} // Aqui eu posso passar o número de tarefas se necessário
      />
    </View>
  );
}
