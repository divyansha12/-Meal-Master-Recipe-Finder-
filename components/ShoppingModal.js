function ShoppingModal(props) {
  return (
    <div 
      className={props.isShoppingModalOpen ? "modal-overlay" : "modal-overlay hidden"} 
      onClick={() => props.setIsShoppingModalOpen(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => props.setIsShoppingModalOpen(false)}>&times;</button>
        <h2 style={{ marginBottom: "20px", borderBottom: '2px solid var(--accent-color)', display: 'inline-block' }}>Your Shopping List</h2>
        <div style={{ minHeight: "200px" }}>
          {props.shoppingList.length === 0 ? (
            <p>Your shopping list is currently empty.</p>
          ) : (
            props.shoppingList.map(recipe => (
              <div key={recipe.idMeal} style={{ marginBottom: "20px", paddingBottom: "10px", borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: "'Antonio', sans-serif" }}>{recipe.strMeal}</h3>
                  <button className="pill-btn mini" style={{ background: '#e11d48' }} onClick={() => props.removeRecipeFromShoppingList(recipe.idMeal)}>Remove</button>
                </div>
                <ul style={{ listStyle: 'inside', marginTop: "10px" }}>
                  {recipe.ingredients.map((ing, j) => (
                    <li key={j} style={{ padding: '2px 0' }}>{ing}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
