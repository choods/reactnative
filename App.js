import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  const selecting = () => {
    if (text.trim() === '') return;

    if (editingIndex !== null) {
      items[editingIndex] = text;
      setItems([...items]);
      setEditingIndex(null);
    } else {
      setItems([...items, text]);
    }

    setText('');
  };

  const handleEdit = (index) => {
    setText(items[index]);
    setEditingIndex(index);
    setShowOptions(null);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setShowOptions(null);
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listing</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={selecting}>
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleOptions(index)}
            >
              <Text style={styles.buttonText}>Options</Text>
            </TouchableOpacity>
            {showOptions === index && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(index)}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(index)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  itemText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editButton: {
    marginRight: 10,
  },
  editText: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  deleteButton: {},
  deleteText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
});
