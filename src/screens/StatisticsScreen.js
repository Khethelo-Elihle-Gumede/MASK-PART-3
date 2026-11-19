import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function StatisticsScreen({ menuItems }) {

  // Calculate the number of all dishes
  const totalItems = menuItems.length;

  // Calculate the average menu price
  const totalPrice = menuItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const averagePrice =
    totalItems > 0 ? totalPrice / totalItems : 0;

  // Count the dishes in each course
  const starterCount = menuItems.filter(
    item => item.course === 'Starter'
  ).length;

  const mainCount = menuItems.filter(
    item => item.course === 'Main Course'
  ).length;

  const dessertCount = menuItems.filter(
    item => item.course === 'Dessert'
  ).length;

  // Reclaimable statistics card
  const StatisticCard = ({ title, value, subtitle }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.heading}>
        Menu Statistics
      </Text>

      <Text style={styles.subtitle}>
        An overview of your restaurant menu.
      </Text>

      {/* General statistics */}

      <StatisticCard
        title="Total Menu Items"
        value={totalItems}
        subtitle="Dishes currently on the menu"
      />

      <StatisticCard
        title="Average Menu Price"
        value={`R${averagePrice.toFixed(2)}`}
        subtitle="Average price of all dishes"
      />

      {/* Course statistics */}

      <Text style={styles.sectionTitle}>
        Dishes by Course
      </Text>

      <View style={styles.courseCard}>

        <View style={styles.courseRow}>
          <Text style={styles.courseName}>
            Starters
          </Text>
          <Text style={styles.courseNumber}>
            {starterCount}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.courseRow}>
          <Text style={styles.courseName}>
            Main Courses
          </Text>
          <Text style={styles.courseNumber}>
            {mainCount}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.courseRow}>
          <Text style={styles.courseName}>
            Desserts
          </Text>
          <Text style={styles.courseNumber}>
            {dessertCount}
          </Text>
        </View>

      </View>

      {totalItems === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No menu statistics are available yet.
            Add dishes to see your statistics.
          </Text>
        </View>
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
    padding: 20,
    paddingBottom: 35,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#203B32',
  },

  subtitle: {
    color: '#758078',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#176B50',
  },

  cardTitle: {
    fontSize: 14,
    color: '#758078',
    fontWeight: '600',
  },

  cardValue: {
    fontSize: 30,
    color: '#176B50',
    fontWeight: 'bold',
    marginTop: 10,
  },

  cardSubtitle: {
    color: '#929B95',
    fontSize: 12,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    color: '#203B32',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 14,
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  courseName: {
    fontSize: 15,
    color: '#35463D',
    fontWeight: '600',
  },

  courseNumber: {
    fontSize: 20,
    color: '#176B50',
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: '#E9EFEB',
  },

  emptyBox: {
    backgroundColor: '#E9F4EF',
    padding: 17,
    borderRadius: 12,
    marginTop: 20,
  },

  emptyText: {
    color: '#176B50',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

});