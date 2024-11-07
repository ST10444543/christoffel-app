import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  TouchableOpacity,  
  Image, 
  FlatList, 
  StyleSheet, 
  ImageBackground, 
  Alert 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Asset Images
const images = {
  salad: require('./assets/food/salad.jpeg'),
  soup: require('./assets/food/soup.jpeg'),
  bruschetta: require('./assets/food/bruschetta.jpeg'),
  steak: require('./assets/food/steak.jpeg'),
  pasta: require('./assets/food/pasta.jpeg'),
  stirfry: require('./assets/food/stirfry.jpeg'),
  iceCream: require('./assets/food/iceCream.jpeg'),
  cake: require('./assets/food/cake.jpeg'),
  fruitSalad: require('./assets/food/fruitSalad.jpeg'),
  background: require('./assets/food/background.jpeg'), 
  userProfile: require('./assets/user-profile.jpg'),
  logo: require('./assets/logo.png'),
};

// Course Button Component
const CourseButton = ({ title, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.courseButton}>
    <Image source={image} style={styles.courseImage} />
    <Text style={styles.courseText}>{title}</Text>
  </TouchableOpacity>
);

// Register Screen
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && email && password) {
      Alert.alert("Registration Successful", `Welcome, ${username}!`);
      navigation.navigate('Login');
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <Button title="Register" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const LoginScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert("Error", "Please enter both username and password.");
    } else if (username === 'Asataluli' && password === 'Asataluli100%') {
      Alert.alert("Login Successful", `Welcome back!`);
      onLogin();
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <TextInput 
          placeholder="Username"
          value={username} 
          onChangeText={setUsername} 
          style={styles.input} 
        />
        <TextInput 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          style={styles.input} 
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Menu Management Screen
const MenuManagementScreen = ({ navigation }) => {
  const [menuItemName, setMenuItemName] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = () => {
    if (menuItemName.trim()) {
      setMenuItems(prevItems => [...prevItems, { name: menuItemName }]);
      setMenuItemName('');
      Alert.alert("Success", `${menuItemName} added to the menu.`);
    } else {
      Alert.alert("Error", "Menu item name cannot be empty.");
    }
  };

  const removeMenuItem = (itemName) => {
    setMenuItems(prevItems => prevItems.filter(item => item.name !== itemName));
    Alert.alert("Removed", `${itemName} removed from the menu.`);
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Menu</Text>
        <TextInput
          placeholder="Menu Item Name"
          value={menuItemName}
          onChangeText={setMenuItemName}
          style={styles.input}
        />
        <Button title="Add Menu Item" onPress={addMenuItem} />
        <FlatList
          data={menuItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Button title="Remove" onPress={() => removeMenuItem(item.name)} />
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

// Menu Screen
const MenuScreen = ({ navigation, handleLogout }) => {
  const starters = [
    { name: 'Salad', price: 50 },
    { name: 'Soup', price: 40 },
    { name: 'Bruschetta', price: 30 },
  ];

  const mainCourses = [
    { name: 'Steak', price: 150 },
    { name: 'Pasta', price: 80 },
    { name: 'Stir Fry', price: 70 },
  ];

  const desserts = [
    { name: 'Ice Cream', price: 60 },
    { name: 'Cake', price: 45 },
    { name: 'Fruit Salad', price: 35 },
  ];

  // Function to calculate average price
  const calculateAverage = (items) => {
    if (items.length === 0) return 0; // Prevent division by zero
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return (total / items.length).toFixed(2);
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Select a Course:</Text>
        <CourseButton title="Starters" image={images.salad} onPress={() => navigation.navigate('Starters')} />
        <CourseButton title="Main Course" image={images.steak} onPress={() => navigation.navigate('MainCourse')} />
        <CourseButton title="Desserts" image={images.iceCream} onPress={() => navigation.navigate('Desserts')} />

        <Text style={styles.averageText}>Average Prices:</Text>
        <Text style={styles.priceText}>Starters: R{calculateAverage(starters)}</Text>
        <Text style={styles.priceText}>Main Courses: R{calculateAverage(mainCourses)}</Text>
        <Text style={styles.priceText}>Desserts: R{calculateAverage(desserts)}</Text>

        <Button title="Logout" onPress={handleLogout} />
        <Button title="Manage Menu" onPress={() => navigation.navigate('MenuManagement')} />
      </View>
    </ImageBackground>
  );
};

// User Profile Screen
const UserProfileScreen = ({ navigation, handleLogout }) => {
  const [username] = useState('Asataluli');
  const [email] = useState('madimaastaluli606@gmail.com');

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <Image source={images.userProfile} style={styles.profileImage} />
        <Text style={styles.description}>Username: {username}</Text>
        <Text style={styles.description}>Email: {email}</Text>
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { username, email })} />
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

// Edit Profile Screen
const EditProfileScreen = ({ route, navigation, handleLogout }) => {
  const { username = '', email = '' } = route.params || {};
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput placeholder="Username" value={newUsername} onChangeText={setNewUsername} style={styles.input} />
        <TextInput placeholder="Email" value={newEmail} onChangeText={setNewEmail} keyboardType="email-address" style={styles.input} />
        <Button title="Save Changes" onPress={() => {
          Alert.alert("Profile Updated", "Your profile has been updated.");
          navigation.navigate('UserProfile', { username: newUsername, email: newEmail });
        }} />
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

// Course Screen
const CourseScreen = ({ navigation, courseItems, addToCart, handleLogout }) => (
  <ImageBackground source={images.background} style={styles.background}>
    <View style={styles.container}>
      <FlatList
        data={courseItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { item })} style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  </ImageBackground>
);

// Meal Details Screen
const MealDetailsScreen = ({ route, navigation, addToCart, handleLogout }) => {
  const { item } = route.params || {}; // Safely access item

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        {item ? (
          <>
            <Image source={item.image} style={styles.dishImage} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: R{item.price}</Text>
            <Button title="Add to Cart" onPress={() => {
              addToCart(item);
              navigation.goBack();
            }} />
            <Button title="Logout" onPress={handleLogout} />
            <Button title="Back" onPress={() => navigation.goBack()} />
          </>
        ) : (
          <Text style={styles.message}>Select your item and view it here</Text>
        )}
      </View>
    </ImageBackground>
  );
};


// Cart Screen
const CartScreen = ({ navigation, cartItems, setCartItems, handleLogout }) => {
  const removeFromCart = (item) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.name !== item.name));
    Alert.alert("Removed", `${item.name} removed from your cart.`);
  };

  const handleCheckout = () => {
    Alert.alert("Checkout", "Thank you for your order!");
    setCartItems([]);
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.cartImage} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item)} />
              </View>
            )}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <Text style={styles.description}>Your cart is empty!</Text>
        )}
        <Button title="Checkout" onPress={handleCheckout} />
        <Button title="Logout" onPress={handleLogout} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

// Main App Component
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
    Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => setIsLoggedIn(false) }
    ]);
  }; 

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        {!isLoggedIn ? (
          <>
            <Drawer.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
            </Drawer.Screen>
            <Drawer.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Menu">
              {(props) => <MenuScreen {...props} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="MenuManagement" component={MenuManagementScreen} />
            <Drawer.Screen name="Starters">
              {(props) => <CourseScreen {...props} courseItems={starters} addToCart={addToCart} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="MainCourse">
              {(props) => <CourseScreen {...props} courseItems={mainCourses} addToCart={addToCart} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="Desserts">
              {(props) => <CourseScreen {...props} courseItems={desserts} addToCart={addToCart} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="MealDetails">
              {(props) => <MealDetailsScreen {...props} addToCart={addToCart} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="Cart">
              {(props) => <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="UserProfile">
              {(props) => <UserProfileScreen {...props} handleLogout={handleLogout} />}
            </Drawer.Screen>
            <Drawer.Screen name="EditProfile">
              {(props) => <EditProfileScreen {...props} handleLogout={handleLogout} />}
            </Drawer.Screen>
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1, 
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  courseButton: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  courseText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 30,
  },
  dishImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  cartImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
  message: {
  fontSize: 18,
  color: '#fff',
  textAlign: 'center',
  marginVertical: 20,
}, 
});

// Sample Data (Replace with actual data)
const starters = [
  { name: 'Salad', image: images.salad, price: 50, description: 'Fresh salad with a variety of vegetables.' },
  { name: 'Soup', image: images.soup, price: 40, description: 'Hot soup with seasonal ingredients.' },
  { name: 'Bruschetta', image: images.bruschetta, price: 30, description: 'Crispy bread topped with tomatoes and basil.' },
];

const mainCourses = [
  { name: 'Steak', image: images.steak, price: 150, description: 'Juicy steak cooked to perfection.' },
  { name: 'Pasta', image: images.pasta, price: 80, description: 'Delicious pasta with homemade sauce.' },
  { name: 'Stir Fry', image: images.stirfry, price: 70, description: 'Stir-fried vegetables with your choice of protein.' },
];

const desserts = [
  { name: 'Ice Cream', image: images.iceCream, price: 60, description: 'Creamy ice cream with various flavors.' },
  { name: 'Cake', image: images.cake, price: 45, description: 'Delicious cake made with fresh ingredients.' },
  { name: 'Fruit Salad', image: images.fruitSalad, price: 35, description: 'A refreshing mix of seasonal fruits.' },
];

// Export App
export default App;
