// React Hooks
const useState = React.useState;
const useEffect = React.useEffect;

function App() {
  // --- 1. SET UP THE VARIABLES (STATE) ---
  const [theme, setTheme] = useState(localStorage.getItem('mm_theme') || 'light');
  const [meals, setMeals] = useState([]);
  const [displayMeals, setDisplayMeals] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('mm_favorites')) || []);
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem('mm_shopping')) || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientTerm, setIngredientTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // --- 2. EFFECTS (RUNS WHEN VARIABLES CHANGE) ---

  // Check URL on load for a shared recipe
  useEffect(function() {
    let params = new URLSearchParams(window.location.search);
    setSelectedRecipeUrl(params.get('recipe'));

    function handleBrowserBack() {
      setSelectedRecipeUrl(new URLSearchParams(window.location.search).get('recipe'));
    }
    window.addEventListener('popstate', handleBrowserBack);
    return function() { window.removeEventListener('popstate', handleBrowserBack); };
  }, []);

  // Update light/dark mode and storage
  useEffect(function() {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mm_theme', theme);
  }, [theme]);

  // Sync favorites/shopping to storage
  useEffect(function() { localStorage.setItem('mm_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(function() { localStorage.setItem('mm_shopping', JSON.stringify(shoppingList)); }, [shoppingList]);

  // Fetch meals from API
  useEffect(function() {
    let timeoutId = setTimeout(async function() {
      setLoading(true);
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchTerm;
        if (ingredientTerm !== '') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + ingredientTerm;
        let response = await fetch(url);
        let data = await response.json();
        setMeals(data.meals || []);
      } catch (error) { console.error('Error:', error); }
      setLoading(false);
    }, 500);
    return function() { clearTimeout(timeoutId); };
  }, [searchTerm, ingredientTerm]);

  // Filter and sort
  useEffect(function() {
    let processed = filterCategory === 'All' ? [...meals] : meals.filter(m => m.strCategory === filterCategory || !m.strCategory);

    if (sortOrder === 'az') processed.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    else if (sortOrder === 'za') processed.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    
    setDisplayMeals(processed);
  }, [meals, filterCategory, sortOrder]);

  // Fetch specific recipe details
  useEffect(function() {
    if (!selectedRecipeUrl) { setRecipeDetails(null); return; }
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + selectedRecipeUrl)
      .then(r => r.json()).then(data => setRecipeDetails(data.meals[0]));
  }, [selectedRecipeUrl]);

  // --- 3. HELPER FUNCTIONS ---

  function openRecipeMode(idMeal) {
    window.history.pushState({ idMeal }, '', '?recipe=' + idMeal);
    setSelectedRecipeUrl(idMeal);
  }

  function closeRecipeMode() {
    window.history.pushState(null, '', window.location.pathname);
    setSelectedRecipeUrl(null);
  }

  function handleFavoriteClick(event, idMeal) {
    event.stopPropagation();
    if (favorites.includes(idMeal)) setFavorites(favorites.filter(id => id !== idMeal));
    else setFavorites([...favorites, idMeal]);
  }

  function addIngredientsToShoppingList(meal) {
    if (shoppingList.some(item => item.idMeal === meal.idMeal)) {
      alert("This recipe is already in your Shopping List!");
      return;
    }
    
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      let name = meal['strIngredient' + i];
      let measure = meal['strMeasure' + i];
      if (name && name.trim()) ingredients.push(`${measure || ''} ${name}`.trim());
    }

    setShoppingList([...shoppingList, { idMeal: meal.idMeal, strMeal: meal.strMeal, ingredients }]);
    alert("Ingredients added!");
  }

  const removeRecipeFromShoppingList = (id) => setShoppingList(shoppingList.filter(i => i.idMeal !== id));
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // --- 5. RENDER ---
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="logo">MEAL MASTER</div>
        <div className="nav-links">
          <div className="search-wrapper">
            <span className="search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></span>
            <input type="text" className="search-input" placeholder="Search any meal..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setIngredientTerm(''); }} />
            {searchTerm && <button className="search-clear" onClick={() => setSearchTerm('')} style={{ display: 'block' }}>✕</button>}
          </div>
          <a href="#featured">Featured</a>
          <a href="#carousel">Best Recipes</a>
          <button onClick={() => setIsShoppingModalOpen(true)} className="nav-icon-btn" style={{ position: 'relative' }}>
            🛒 <span style={{ position: 'absolute', top: "-5px", right: "-10px", background: 'var(--accent-color)', color: 'var(--bg-color)', borderRadius: '50%', fontSize: '0.7rem', padding: '2px 6px' }}>{shoppingList.length}</span>
          </button>
          <button onClick={changeTheme} className="nav-icon-btn">{theme === 'dark' ? '☀️' : '🌓'}</button>
        </div>
      </nav>

      <header className="hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000')" }}><div className="hero-overlay"></div><div className="hero-content"><h1 className="hero-title">HUNGRY<br/>FOR MORE</h1></div></header>

      <main className="main-content">
        <section id="featured" className="first-look"><p className="eyebrow">First Look</p><h2 className="section-title">MEAL MASTER SUPREME</h2><p className="section-desc">Experience culinary excellence.</p><button className="pill-btn">Explore Recipe</button></section>
        <Controls ingredientTerm={ingredientTerm} handleIngredientInput={e => { setIngredientTerm(e.target.value); setSearchTerm(''); }} filterCategory={filterCategory} setFilterCategory={setFilterCategory} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <MealGrid loading={loading} displayMeals={displayMeals} favorites={favorites} openRecipeMode={openRecipeMode} handleFavoriteClick={handleFavoriteClick} />
        <section className="banner-section"><div className="banner"><h2 className="banner-title">STEP INTO WHAT TASTES GOOD</h2></div></section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col"><a href="#/" className="bold-link">FIND A RECIPE</a><a href="#/" className="bold-link">BECOME A MEMBER</a><a href="#/" className="bold-link">FEEDBACK</a></div>
          <div className="footer-col"><h4>GET HELP</h4><a href="#/">Order Status</a><a href="#/">Delivery</a><a href="#/">Returns</a></div>
          <div className="footer-col"><h4>ABOUT US</h4><a href="#/">News</a><a href="#/">Careers</a><a href="#/">Investors</a></div>
        </div>
        <p className="copyright">&copy; 2026 Meal Master, Inc. All Rights Reserved</p>
      </footer>

      <RecipeModal selectedRecipeUrl={selectedRecipeUrl} recipeDetails={recipeDetails} showNutrition={showNutrition} setShowNutrition={setShowNutrition} closeRecipeMode={closeRecipeMode} addIngredientsToShoppingList={addIngredientsToShoppingList} />
      <ShoppingModal isShoppingModalOpen={isShoppingModalOpen} setIsShoppingModalOpen={setIsShoppingModalOpen} shoppingList={shoppingList} removeRecipeFromShoppingList={removeRecipeFromShoppingList} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);