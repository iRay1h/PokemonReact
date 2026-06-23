# Pokédex Mobile App

Una aplicación móvil desarrollada con **React Native** y **Expo** que permite explorar información de pokémon, buscar por nombre y guardar favoritos de forma local.

## 📋 Descripción del Problema

**Problemática:** Los usuarios necesitan una forma rápida y sencilla para consultar información sobre pokémon desde sus dispositivos móviles, sin necesidad de una conexión especial o interfaz compleja.

**Solución:** Pokédex Mobile es una aplicación intuitiva que proporciona acceso a una base de datos completa de pokémon, permitiendo:

- Explorar la lista de pokémon en páginas de 20 elementos
- Buscar pokémon específicos por nombre o ID
- Ver información detallada (tipos, peso, altura, estadísticas)
- Consultar la línea evolutiva completa y el estado actual
- Guardar favoritos de forma local para acceso rápido

## 🎯 Características Principales

- ✅ **Exploración de Pokémon**: Navega por páginas con 20 pokémon cada una
- ✅ **Búsqueda**: Busca pokémon por nombre o por ID
- ✅ **Vista de Detalle**: Información completa con estadísticas y línea evolutiva
- ✅ **Favoritos**: Guarda tus pokémon preferidos localmente
- ✅ **Dashboard estilo Pokédex**: Mensaje guía y datos de página activa

## 🛠️ Requisitos Previos

Asegúrate de tener instalados:

- **Node.js** v16 o superior ([descargar](https://nodejs.org/))
- **npm** v8 o superior
- **Expo CLI** (se instala automáticamente con npm)

Verifica las versiones:

```bash
node --version
npm --version
```

## 📥 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/iRay1h/PokemonReact.git
cd pokedex-app
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala todas las dependencias necesarias:

- React Navigation y Bottom Tabs
- Axios (para llamadas a la API)
- AsyncStorage (para guardar favoritos)
- Expo (runtime y herramientas de compilación)

### 3. Iniciar el Servidor de Desarrollo

#### Opción A: Ejecutar en el Navegador Web

```bash
npm run web
```

La aplicación se abrirá en `http://localhost:8081` en tu navegador predeterminado.

#### Opción B: Ejecutar en Dispositivo Móvil con Expo Go

```bash
npm start
```

Se mostrará un código QR en la terminal. Escanea el código QR con la aplicación **Expo Go**:

- **iOS**: Descarga Expo Go desde la App Store, abre la app y escanea el código QR
- **Android**: Descarga Expo Go desde Google Play, abre la app y escanea el código QR

## 📁 Estructura del Proyecto

```
pokedex-app/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── PokemonCard.js       # Tarjeta de pokémon
│   │   ├── SearchBar.js         # Buscador
│   │   └── Loading.js           # Indicador de carga
│   │
│   ├── screens/                 # Pantallas principales
│   │   ├── HomeScreen.js        # Lista de pokémon
│   │   ├── DetailScreen.js      # Detalle de pokémon
│   │   └── FavoritesScreen.js   # Pokémon favoritos
│   │
│   ├── services/
│   │   └── pokemonService.js    # Llamadas a PokeAPI
│   │
│   ├── hooks/
│   │   └── usePokemon.js        # Hook personalizado
│   │
│   ├── navigation/
│   │   └── AppNavigator.js      # Configuración de navegación
│   │
│   └── styles/
│       └── globalStyles.js      # Estilos globales
│
├── App.js                       # Punto de entrada
├── app.json                     # Configuración de Expo
├── package.json                 # Dependencias
└── README.md                    # Este archivo
```

## 🏗️ Arquitectura de la Aplicación

### Componentes Modulares

- **PokemonCard**: Tarjeta reutilizable que muestra imagen y nombre
- **SearchBar**: Componente de búsqueda reutilizable
- **Loading**: Indicador de carga centralizado

### Pantallas

- **HomeScreen**: Listado principal con búsqueda y scroll infinito
- **DetailScreen**: Información completa del pokémon con opción de favoritos
- **FavoritesScreen**: Lista de pokémon guardados localmente

### Hooks Personalizados

- **usePokemon**: Gestiona el fetch y estado de un pokémon específico

### Navegación

- **Tab Navigation**: Dos pestañas principales (Explorar, Favoritos)
- **Stack Navigation**: Navegación entre lista y detalle

### Almacenamiento Local

- **AsyncStorage**: Guarda los IDs de pokémon favoritos

## 🔌 Integración con API

La aplicación usa la **PokeAPI** (https://pokeapi.co/) para obtener datos de pokémon.

Endpoints utilizados:

- `GET /pokemon` - Lista de pokémon (con paginación)
- `GET /pokemon/{id}` - Detalles de un pokémon específico
- `GET /pokemon-species/{id}` - Información de la especie y datos de evolución
- `GET /evolution-chain/{id}` - Línea evolutiva completa

## 💻 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en navegador web
npm run web

# Ejecutar en emulador Android
npm run android

# Ejecutar en simulador iOS
npm run ios

# Limpiar caché y reinstalar dependencias
npm run reset-project
```

## 📱 Cómo Usar la App

### Explorar Pokémon

1. Abre la aplicación
2. Verás un dashboard con la página activa y el total de pokémon
3. Navega entre páginas usando los botones "Anterior" y "Siguiente"
4. Presiona cualquier tarjeta para ver detalles

### Buscar Pokémon

1. Usa el campo de búsqueda en la parte superior
2. Escribe el nombre o el ID del pokémon
3. La lista mostrará los resultados coincidentes
4. Usa el botón "X" para limpiar la búsqueda

### Agregar a Favoritos

1. Abre los detalles de un pokémon
2. Presiona el botón "Agregar a Favoritos"
3. Ve a la pestaña "Favoritos" para verlos guardados

### Ver Detalles

- **Tipos**: Los colores indican el tipo (fuego, agua, etc.)
- **Estadísticas**: Gráficas de cada atributo base
- **Información Física**: Altura y peso

## 🎨 Paleta de Colores

| Color                  | Uso                             |
| ---------------------- | ------------------------------- |
| `#DC143C` (Rojo)       | Color primario, botones, header |
| `#FFD700` (Oro)        | Acentos                         |
| `#F5F5F5` (Gris claro) | Fondo general                   |
| `#FFFFFF` (Blanco)     | Tarjetas y componentes          |
| `#808080` (Gris)       | Texto secundario                |

## ✨ Principios de Diseño y UX/UI

### Usabilidad

- **Interfaz Intuitiva**: Los controles son obvios y accesibles
- **Feedback Visual**: Indicadores de carga y cambios de estado
- **Búsqueda Rápida**: Filtrado en tiempo real sin envío de formulario

### Accesibilidad

- **Tamaños de Texto**: Escalables y legibles
- **Contraste Adecuado**: Texto oscuro sobre fondos claros
- **Iconos + Texto**: Cada control tiene etiqueta y símbolo

### Experiencia de Usuario

- ✅ **Paginación por página**: Navega 20 pokémon por página
- ✅ **Dashboard de Pokédex**: Mensaje guía y estado de página
- ✅ **Línea evolutiva**: Ver todas las etapas y nivel de evolución
- ✅ **Estados Vacíos**: Mensaje claro cuando no hay resultados o favoritos

## 🧪 Testing Manual

Para verificar que todo funciona correctamente:

1. **Buscar un pokémon**: `pikachu`
2. **Ver detalles**: Presiona la tarjeta
3. **Agregar a favoritos**: Botón en detalles
4. **Verificar favoritos**: Ve a la pestaña "Favoritos"
5. **Scroll infinito**: Desplázate hasta el final de la lista

## 📦 Dependencias Principales

```json
{
  "@react-native-async-storage/async-storage": "^3.x",
  "@react-navigation/bottom-tabs": "^7.x",
  "@react-navigation/native": "^7.x",
  "@react-navigation/native-stack": "^7.x",
  "axios": "^1.x",
  "expo": "~56.x",
  "react": "19.x",
  "react-native": "0.85.x"
}
```

## 🐛 Solución de Problemas

### La app no carga

```bash
npm run reset-project
npm install
npm start
```

### Error de conexión a la API

- Verifica tu conexión a internet
- La PokeAPI puede tener limitaciones de velocidad
- Espera unos segundos y recarga

### Los favoritos no se guardan

- Verifica los permisos de almacenamiento
- En Android: Ve a Configuración > Apps > Permisos
- En iOS: Ve a Configuración > Privacidad

## 👨‍💻 Conceptos Técnicos Implementados

✅ **Componentes Modulares**: PokemonCard, SearchBar, Loading  
✅ **React Navigation**: Tab + Stack Navigator  
✅ **Hooks**: useState, useEffect, useFocusEffect  
✅ **Hook Personalizado**: usePokemon para lógica centralizada  
✅ **StyleSheet**: Todos los estilos sin inline styles  
✅ **Servicios**: pokemonService para API calls  
✅ **AsyncStorage**: Persistencia de datos locales  
✅ **Clean Code**: Funciones pequeñas, nombrado descriptivo, SOLID

## 📝 Notas para la Sustentación

- **Modularidad**: Cada componente tiene una única responsabilidad
- **Reutilización**: PokemonCard se usa en HomeScreen y FavoritesScreen
- **Eficiencia**: Scroll infinito evita cargar todos los pokémon al inicio
- **Almacenamiento**: AsyncStorage guarda favoritos sin servidor
- **API**: PokeAPI es gratuita y no requiere autenticación

## 📄 Licencia

Este proyecto es de uso educativo bajo la licencia MIT.

## 🤝 Autor

Desarrollado como proyecto final de evaluación para SENA - Programa ADSO

---

**Última actualización**: Junio 2026

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
