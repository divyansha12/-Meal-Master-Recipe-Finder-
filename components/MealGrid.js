function MealGrid(props) {
  const isFavorite = (id) => props.favorites.includes(id);

  return (
    <section id="carousel" className="carousel-section">
      <div className="section-header">
        <h2 className="section-title left">Best of Recipes</h2>
      </div>
      <div className="carousel-track">
        {props.loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card skeleton" style={{ minWidth: "350px" }}>
              <div style={{ height: "300px" }}></div>
              <div style={{ height: "20px", width: '70%', margin: '16px 20px', background: 'rgba(150,150,150,0.3)' }}></div>
            </div>
          ))
        ) : props.displayMeals.length === 0 ? (
          <p style={{ color: 'var(--text-color)', margin: '0 auto', width: '100%', textAlign: 'center' }}>
            No meals found. Try a different search.
          </p>
        ) : (
          props.displayMeals.map(meal => (
            <div key={meal.idMeal} className="card" onClick={() => props.openRecipeMode(meal.idMeal)}>
              <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
              <div className="card-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory || 'Generic'} • {meal.strArea || 'Various'}</p>
                <div className="card-footer">
                  <button 
                    className={`fav-btn ${isFavorite(meal.idMeal) ? 'active' : ''}`} 
                    onClick={(e) => props.handleFavoriteClick(e, meal.idMeal)}
                  >
                    {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
