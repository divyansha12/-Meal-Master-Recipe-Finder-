# Meal Master Supreme 🍜

**Meal Master Supreme** is a modern, responsive recipe finder built with React, featuring a dynamic dark/light theme, advanced search, recipe filtering, and a smart shopping list.

## 🚀 Features

- **Dynamic Theme System**: Toggle between **Dark Mode** and **Light Mode** with instant visual feedback.
- **Advanced Search**: Search recipes by name or filter by ingredients.
- **Recipe Details**: View detailed recipe information including ingredients, instructions, and YouTube tutorials.
- **Favorites Management**: Save your favorite recipes and access them anytime.
- **Smart Shopping List**: Automatically generate a shopping list from your favorite recipes.
- **Responsive Design**: Built with modern CSS Grid and Flexbox for a seamless experience on all devices.
- **Smooth Animations**: Subtle transitions and micro-interactions for a premium feel.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Vanilla CSS with CSS Custom Properties (Variables)
- **Icons**: Inline SVG
- **API**: TheMealDB

## 📂 Project Structure

```
-Meal-Master-Recipe-Finder/
├── components/
│   ├── Controls.js         # Search and filter controls
│   ├── MealGrid.js         # Grid display for recipes
│   ├── RecipeModal.js      # Modal for recipe details
│   └── ShoppingModal.js    # Modal for shopping list
├── css/
│   ├── style.css           # Main styles and dark mode variables
│   └── dark.css            # Dark mode specific styles
├── script.js               # Main React application
└── index.html              # Entry point
```

## ⚙️ Setup

1.  **Clone the repository** (or download the source code).
2.  **Open `index.html`** in your web browser.

    *No server or build step is required!* The project uses React and Babel via CDN, allowing you to run it directly from your file system.

## 🎨 Customization

- **Colors**: Edit the CSS variables in `css/style.css` to change the color scheme.
- **API**: You can switch to a different recipe API by updating the `fetch` URLs in `script.js`.
- **Components**: Modify the React components in the `components/` folder to change the UI/UX.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.