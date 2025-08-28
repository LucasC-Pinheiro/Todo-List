import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { TextInputComponent } from "@/components/inputs/TextInputComponent";

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
}

export function AddCategoryModal({ visible, onClose, onAddCategory }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName("");
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}>
        <View style={{
          backgroundColor: "#262626",
          borderRadius: 12,
          padding: 20,
          width: "100%",
          maxWidth: 300
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center"
          }}>
            Nova Categoria
          </Text>

          <TextInputComponent
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Nome da categoria..."
            style={{ 
              marginBottom: 16,
              color: "#fff"
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "#e63946",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 6,
                flex: 1,
                marginRight: 8
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: "#2563eb",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 6,
                flex: 1,
                marginLeft: 8
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                Adicionar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
