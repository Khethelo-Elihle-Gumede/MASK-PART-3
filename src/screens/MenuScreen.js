import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import MenuItemCard from '../components/MenuItemCard';

const COURSES = ['Starter', 'Main Course', 'Dessert'];

export default function MenuScreen({
  menuItems,
  setMenuItems,
  search,
  setSearch,
  selectedCourse,
  setSelectedCourse,
}) {

  // Form information
  const [dishName, setDishName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [course, setCourse] = React.useState('Starter');
  const [price, setPrice] = React.useState('');

  // Keeping track with any dish being edited
  const [editingId, setEditingId] = React.useState(null);

  // Error Validation
  const [error, setError] = React.useState('');

  // Clear the form after saving
  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setEditingId(null);
    setError('');
  };

  // Add a new dish or update an existing dish
  const saveDish = () => {

    if (
      !dishName.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      setError('Please complete all required fields.');
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError('Enter a valid price greater than zero.');
      return;
    }

    const dishData = {
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice,
    };

    if (editingId !== null) {

      // Update the selected dish
      setMenuItems(previousItems =>
        previousItems.map(item =>
          item.id === editingId
            ? { ...item, ...dishData }
            : item
        )
      );

      Alert.alert(
        'Dish Updated',
        'The menu item has been updated successfully.'
      );

    } else {

      // Add a new dish
      const newDish = {
        id: Date.now().toString(),
        ...dishData,
      };

      setMenuItems(previousItems => [
        ...previousItems,
        newDish,
      ]);

      Alert.alert(
        'Dish Added',
        'The new dish has been added to the menu.'
      );
    }

    clearForm();
  };

  // Load existing dish details into the form
  const editDish = (item) => {
    setDishName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(String(item.price));
    setEditingId(item.id);
    setError('');
  };

  // Delete a dish after confirmation
  const deleteDish = (id) => {
    Alert.alert(
      'Delete Dish',
      'Are you sure you want to delete this dish?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(previousItems =>
              previousItems.filter(item => item.id !== id)
            );

            if (editingId === id) {
              clearForm();
            }

            Alert.alert(
              'Deleted',
              'The dish has been removed from your menu.'
            );
          },
        },
      ]
    );
  };

  // Search by dish name or filter item
  const filteredItems = menuItems.filter(item => {

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' ||
      item.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >

      {/* Application intro */}
      <View style={styles.intro}>
        <Text style={styles.heading}>
          Restaurant Menu
        </Text>

        <Text style={styles.subtitle}>
          Add and manage your delicious dishes.
        </Text>
      </View>

      {/* Add or edit dish form */}
      <View style={styles.formCard}>

        <Text style={styles.formTitle}>
          {editingId ? 'Edit Menu Item' : 'Add New Dish'}
        </Text>

        <Text style={styles.label}>
          Dish Name *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Grilled Chicken"
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>
          Description *
        </Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Describe your dish..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>
          Course *
        </Text>

        <View style={styles.courseOptions}>
          {COURSES.map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setCourse(option)}
              style={[
                styles.courseButton,
                course === option && styles.selectedCourse,
              ]}
            >
              <Text
                style={[
                  styles.courseText,
                  course === option && styles.selectedCourseText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Price (R) *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 120.00"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        {error !== '' && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveDish}
        >
          <Text style={styles.saveButtonText}>
            {editingId ? 'Update Dish' : '+ Add Dish'}
          </Text>
        </TouchableOpacity>

        {editingId !== null && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={clearForm}
          >
            <Text style={styles.cancelText}>
              Cancel Editing
            </Text>
          </TouchableOpacity>
        )}

      </View>

      {/* Search */}
      <Text style={styles.sectionTitle}>
        Find a Dish
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search by dish name..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Course filter */}
      <Text style={styles.label}>
        Filter by Course
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {['All', ...COURSES].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedCourse(option)}
            style={[
              styles.filterButton,
              selectedCourse === option && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedCourse === option && styles.activeFilterText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Display menu items */}
      <View style={styles.listHeading}>
        <Text style={styles.sectionTitle}>
          Our Menu
        </Text>

        <Text style={styles.itemCount}>
          {filteredItems.length} dishes
        </Text>
      </View>

      {filteredItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>
            No dishes found
          </Text>

          <Text style={styles.emptyText}>
            Add a new dish or clear your search and filter.
          </Text>
        </View>
      ) : (
        filteredItems.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            onEdit={() => editDish(item)}
            onDelete={() => deleteDish(item.id)}
          />
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  intro: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#203B32',
  },

  subtitle: {
    fontSize: 14,
    color: '#758078',
    marginTop: 6,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 19,
    borderRadius: 17,
    elevation: 3,
    marginBottom: 25,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#203B32',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#35463D',
    marginTop: 13,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FAFCFA',
    borderWidth: 1,
    borderColor: '#DCE5DE',
    borderRadius: 10,
    paddingHorizontal: 13,
    height: 49,
    color: '#263A30',
    fontSize: 14,
  },

  descriptionInput: {
    height: 85,
    textAlignVertical: 'top',
    paddingTop: 13,
  },

  courseOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  courseButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: '#F0F3F1',
  },

  selectedCourse: {
    backgroundColor: '#176B50',
  },

  courseText: {
    color: '#526057',
    fontSize: 12,
    fontWeight: '600',
  },

  selectedCourseText: {
    color: '#FFFFFF',
  },

  error: {
    color: '#C03939',
    marginTop: 12,
    fontSize: 13,
  },

  saveButton: {
    backgroundColor: '#176B50',
    height: 50,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },

  cancelText: {
    color: '#C03939',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 19,
    color: '#203B32',
    fontWeight: 'bold',
    marginBottom: 12,
  },

  filters: {
    marginTop: 5,
    marginBottom: 22,
  },

  filterButton: {
    backgroundColor: '#E9EFEB',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 9,
  },

  activeFilter: {
    backgroundColor: '#176B50',
  },

  filterText: {
    color: '#526057',
    fontSize: 12,
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  itemCount: {
    color: '#758078',
    fontSize: 13,
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 14,
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#203B32',
    fontSize: 17,
    fontWeight: 'bold',
  },

  emptyText: {
    color: '#758078',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
});  