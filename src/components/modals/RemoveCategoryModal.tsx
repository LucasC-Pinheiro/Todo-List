import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface RemoveCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onRemoveCategory: () => void;
  categoryName: string | undefined;
  taskCount: number;
}

export function RemoveCategoryModal({ 
  visible, 
  onClose, 
  onRemoveCategory, 
  categoryName,
  taskCount 
}: RemoveCategoryModalProps) {
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
            Remover Categoria
          </Text>

          <Text style={{
            color: "#fff",
            fontSize: 14,
            marginBottom: 16,
            textAlign: "center",
            lineHeight: 20
          }}>
            Tem certeza que deseja remover a categoria "{categoryName}"?
            {taskCount > 0 && (
              <Text style={{ color: "#e63946", fontWeight: "bold" }}>
                {"\n"}Esta categoria contém {taskCount} tarefa{taskCount !== 1 ? 's' : ''} que serão perdidas.
              </Text>
            )}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "#6b7280",
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
              onPress={onRemoveCategory}
              style={{
                backgroundColor: "#e63946",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 6,
                flex: 1,
                marginLeft: 8
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
