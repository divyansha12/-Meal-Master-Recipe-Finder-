function RecipeModal(props) {
  if (props.selectedRecipeUrl === null) return null;

  const meal = props.recipeDetails;

  return (
    <div 
      className={props.selectedRecipeUrl ? "modal-overlay" : "modal-overlay hidden"} 
      onClick={props.closeRecipeMode}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={props.closeRecipeMode}>&times;</button>
        
        {!meal ? (
          <p style={{ color: 'var(--text-color)', textAlign: 'center' }}>Loading details...</p>
        ) : (
          <div className="modal-detail">
            <h2 className="section-title" style={{ marginBottom: "10px", color: 'var(--text-color)' }}>{meal.strMeal}</h2>
            <div className="modal-grid">
              
              <div className="ingredients" style={{ color: 'var(--text-color)' }}>
                <div className="nutrition-toggle-container">
                  <span>Nutrition Facts</span>
                  <div style={{ display: 'flex', gap: "10px" }}>
                    <button className="pill-btn mini" onClick={() => props.setShowNutrition(!props.showNutrition)}>Toggle</button>
                    <button className="pill-btn mini" style={{ background: '#4ade80', color: '#111' }} onClick={() => props.addIngredientsToShoppingList(meal)}>Add to List 🛒</button>
                  </div>
                </div>
                
                {props.showNutrition && (
                  <div className="nutrition-panel" style={{ color: 'var(--text-color)' }}>
                    <div className="fact-item"><span>Calories</span><span>350</span></div>
                    <div className="fact-item"><span>Protein</span><span>25g</span></div>
                    <div className="fact-item"><span>Fat</span><span>10g</span></div>
                    <div className="fact-item"><span>Carbs</span><span>30g</span></div>
                  </div>
                )}

                <h3 style={{ borderBottom: '2px solid var(--accent-color)' }}>Ingredients</h3>
                <ul style={{ listStyle: 'inside', marginTop: "10px" }}>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const name = meal['strIngredient' + (i + 1)];
                    const measure = meal['strMeasure' + (i + 1)];
                    if (name && name.trim()) {
                      return <li key={i} style={{ padding: '4px 0' }}>{`${measure || ''} ${name}`.trim()}</li>;
                    }
                    return null;
                  })}
                </ul>
              </div>
              
              <div className="instructions" style={{ color: 'var(--text-color)' }}>
                <h3 style={{ borderBottom: '2px solid var(--accent-color)' }}>Instructions</h3>
                <div style={{ fontSize: '1.1rem', lineHeight: 1.6, marginTop: "10px" }}>
                  {meal.strInstructions.split('\n').filter(line => line.trim().length > 10).map((line, i) => (
                    <p key={i} style={{ marginBottom: "15px" }}>
                      <strong>{i + 1}.</strong> {line.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
