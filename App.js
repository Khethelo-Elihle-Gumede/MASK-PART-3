import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import MenuScreen from './screens/MenuScreen';
import StatisticsScreen from './screens/StatisticsScreen';

export default function App() {

  // Store all restaurant menu items
  const [menuItems, setMenuItems] = useState([]);

  // Control the active screen
  const [activeScreen, setActiveScreen] = useState('Menu');

  // Store search information
  const [search, setSearch] = useState('');

  // Store selected course filter
  const [selectedCourse, setSelectedCourse] = useState('All');

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#153C32"
        barStyle="light-content"
      />

      {/* Application header */}

      <View style={styles.header}>

        <View>
          <Text style={styles.brand}>
            CHRISTOFFEL'S
          </Text>

          <Text style={styles.headerTitle}>
            Chef's Menu Manager
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.iconText}>
            CM
          </Text>
        </View>

      </View>

      {/* Screen navigation */}

      <View style={styles.navigation}>

        <TouchableOpacity
          style={[
            styles.navButton,
            activeScreen === 'Menu' && styles.activeNav,
          ]}
          onPress={() => setActiveScreen('Menu')}
        >
          <Text
            style={[
              styles.navText,
              activeScreen === 'Menu' && styles.activeNavText,
            ]}
          >
            Menu Management
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            activeScreen === 'Statistics' && styles.activeNav,
          ]}
          onPress={() => setActiveScreen('Statistics')}
        >
          <Text
            style={[
              styles.navText,
              activeScreen === 'Statistics' && styles.activeNavText,
            ]}
          >
            Statistics
          </Text>
        </TouchableOpacity>

      </View>

      {/* Display selected screen */}

      <View style={styles.screenContainer}>

        {activeScreen === 'Menu' ? (

          <MenuScreen
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            search={search}
            setSearch={setSearch}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />

        ) : (

          <StatisticsScreen
            menuItems={menuItems}
          />

        )}

      </View>

      {/* Footer */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Christoffel's Restaurant | Menu Management
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  header: {
    backgroundColor: '#153C32',
    paddingHorizontal: 20,
    paddingVertical: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    fontSize: 11,
    color: '#B9D7C8',
    letterSpacing: 2,
    fontWeight: 'bold',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },

  headerIcon: {
    height: 43,
    width: 43,
    borderRadius: 13,
    backgroundColor: '#28624E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  navigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
  },

  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 9,
  },

  activeNav: {
    backgroundColor: '#176B50',
  },

  navText: {
    color: '#66736B',
    fontSize: 13,
    fontWeight: '600',
  },

  activeNavText: {
    color: '#FFFFFF',
  },

  screenContainer: {
    flex: 1,
  },

  footer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EDE9',
  },

  footerText: {
    color: '#8A958D',
    fontSize: 10,
  },

});
