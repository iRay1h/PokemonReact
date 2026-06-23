import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import { colors } from "../styles/globalStyles";

import DetailScreen from "../screens/DetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * HomeStack - Stack de navegación para la pantalla Home
 */
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Pokédex",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: "Detalles",
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

/**
 * FavoritesStack - Stack de navegación para la pantalla Favorites
 */
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Detalles",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * AppNavigator - Navegador principal con Tab Navigation
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            borderTopColor: colors.lightGray,
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: 4,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Explorar",
            tabBarIcon: ({ color }) => <Text style={styles.iconText}>🔍</Text>,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ color }) => <Text style={styles.iconText}>❤️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Importar Text para los iconos

export default AppNavigator;

const styles = StyleSheet.create({
  iconText: {
    fontSize: 20,
  },
});
