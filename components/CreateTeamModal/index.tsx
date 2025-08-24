import { Modal, View as RNView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { View, Text } from "@/components";
import { useState } from "react";
import { styles } from "./style";

interface CreateTeamModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate?: (teamName: string) => void;
  isLoading?: boolean;
}

export function CreateTeamModal({ visible, onClose, onCreate, isLoading }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("");

  const handleCreate = () => {
    if (onCreate) {
      onCreate(teamName.trim());
    }
    setTeamName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <RNView style={styles.overlay} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetWrapper}
      >
        <View style={styles.sheetContainer}>
          <Text style={styles.title}>Create new team</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Team name</Text>
            <TextInput
              value={teamName}
              onChangeText={setTeamName}
              placeholder="e.g. Thunderbolts"
              placeholderTextColor="#8B8B8B"
              style={styles.input}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreate}
            />
          </View>

          <TouchableOpacity
            onPress={handleCreate}
            disabled={!teamName.trim() || isLoading}
            style={[
              styles.createButton,
              !teamName.trim() && { opacity: 0.6 },
            ]}
          >
            <Text style={styles.createButtonText}>{isLoading ? "Creating..." : "Create"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
