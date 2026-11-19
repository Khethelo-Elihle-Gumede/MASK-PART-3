import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Reusable card for displaying any one item selected
export default function MenuItemCard({
  item,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.card}>

      <View style={styles.topRow}>
        <View style={styles.details}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.course}>
            {item.course}
          </Text>
        </View>

        <Text style={styles.price}>
          R{Number(item.price).toFixed(2)}
        </Text>
      </View>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
        >
          <Text style={styles.editText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8EDE9',
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  details: {
    flex: 1,
    marginRight: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#203B32',
  },

  course: {
    fontSize: 12,
    color: '#16805B',
    marginTop: 5,
    fontWeight: '600',
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#16805B',
  },

  description: {
    fontSize: 14,
    color: '#727C76',
    lineHeight: 21,
    marginTop: 12,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },

  editButton: {
    backgroundColor: '#E9F4EF',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 9,
  },

  editText: {
    color: '#16805B',
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#FCECEC',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 9,
  },

  deleteText: {
    color: '#C03939',
    fontWeight: 'bold',
  },
});