# Food Ordering App

This application serves as a food ordering and menu management system developed using React Native. It enables users to sign up, log in, handle a menu, browse food items, add them to a shopping cart, and finalize their orders. The app also offers profile management features, allowing users to view and modify their profile information.

## Changelog

### **Modifications from Part 2 to Part 3**

#### **1. User Authentication**
- **Login & Registration Screens**:
  - Implemented registration functionality, including fields for email, username, and password.
  - Established basic login capabilities with hardcoded credentials (`Asataluli` and `Asataluli100%`).
  - Incorporated validation to ensure that both the username and password fields are filled in during login and registration.
  - Added straightforward alert messages for successful registration and login instances.
  - Redirected users to the login page after a successful registration.

#### **2. Menu Management**
- **Menu Management Screen**:
  - Introduced a **MenuManagementScreen** where administrators can add or delete menu items.
  - Enabled a list of menu items with options to dynamically add and remove them.
  - Integrated alerts to confirm the addition and deletion of menu items.

#### **3. Food Ordering System**
- **Menu Screen**:
  - Included buttons for selecting categories such as **Starters**, **Main Courses**, and **Desserts**.
  - Displayed average prices for each category (calculated dynamically based on the prices of menu items).
  - Added a **Logout** button and a **Manage Menu** button.
- **Course Screen**:
  - Developed individual course screens for **Starters**, **Main Courses**, and **Desserts**, each showcasing a list of items.
  - Facilitated navigation to a detailed view of the meal when a user clicks on an item.
- **Meal Details Screen**:
  - Created a detailed view for each food item where users can see additional details like the description and price.
  - Included a button to add the selected meal to the cart.
- **Cart Screen**:
  - Established a shopping cart where users can include and remove items.
  - Integrated a simple checkout process that clears the cart following a successful checkout.

#### **4. Profile Management**
- **User Profile Screen**:
  - Presented the user's profile with modifiable information (username and email).
  - Added an **Edit Profile** button for navigation to the **EditProfileScreen**.
- **Edit Profile Screen**:
  - Implemented functionality for users to modify their username and email.
  - Included a save button that updates the profile and displays an alert message confirming the update.

#### **5. Drawer Navigation**
- Incorporated **Drawer.Navigator** for seamless navigation among screens.
  - Users are directed to the login page if they are not authenticated, or they are taken to the menu screen if they are logged in.
  - Enabled conditional rendering of different screens based on the `isLoggedIn` status.

### **Refactoring Changes**
Throughout the refactoring phase, various elements of the application were enhanced for improved performance, maintainability, and user experience:

#### **1. Component Modularization**
- **CourseButton Component**:
  - Developed a reusable `CourseButton` component to manage course selection within the **MenuScreen**.
  - This component is now utilized for all course selections (Starters, Main Courses, Desserts).
- **Meal Details Screen**:
  - Refined the **MealDetailsScreen** to more effectively present item details with the option to add to the cart.

#### **2. Refactor of State Management**
- Transitioned from basic local state management (using `useState`) to a more centralized method for handling the cart state.
- Implemented functions such as `addToCart` and `setCartItems` for global management of cart items.
- **Handle Logout Function**:
  - Established a specific `handleLogout` function to oversee user logout procedures with alerts.

#### **3. Consistent Visual Style**
- Developed a more uniform style across all screens by employing a shared `StyleSheet` for all screen elements (buttons, text inputs, containers).
- Revised **ImageBackground** usage to ensure uniformity with background images, enhancing the app’s visual appeal.

#### **4. Enhanced User Feedback**
- Alerts have been incorporated for significant user actions, such as registering, logging in, adding items to the cart, and finalizing the checkout.
- The application now offers more substantial feedback to users when actions are executed or errors arise (e.g., missing fields during login or registration).

#### **5. Streamlined Navigation Logic**
- Improved navigation flow to provide smoother transitions between screens. Each screen now includes a **Back** button that returns users to the previous screen.
- Employed conditional rendering in the `Drawer.Navigator` to display different navigation options based on the user's login status.

#### **6. Organized Code Structure**
- Enhanced file organization and code readability:
  - Components have been grouped logically into reusable units.
  - The `images` constant has been relocated to a separate file for better asset management.
  - Each screen has an individual component, resulting in a more modular and maintainable codebase.

#### **7. Introduced Static Data for Menu Items**
- Developed sample data for **starters**, **main courses**, and **desserts** to mimic actual menu items.
  - This data is now dynamically rendered on the relevant course screens.

#### **8. Enhancements to Styling**
- Improved layout and spacing, particularly for smaller screen sizes, utilizing flexbox and percentage-based widths for consistent device compatibility.
- Refined the styling of buttons and input fields to enhance UI uniformity.
