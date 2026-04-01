function Controls(props) {
  return (
    <section className="controls-section">
      <div className="filters-container">
        <div className="filter-dropdowns" style={{ display: 'flex', gap: "16px" }}>
          <input 
            type="text" 
            className="sort-select" 
            placeholder="Filter by Ingredient..." 
            style={{ width: "220px" }}
            value={props.ingredientTerm}
            onChange={props.handleIngredientInput}
          />
          <select className="sort-select" value={props.filterCategory} onChange={function(e) { props.setFilterCategory(e.target.value) }}>
            <option value="All">All Categories</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Seafood">Seafood</option>
            <option value="Dessert">Dessert</option>
          </select>
          <select className="sort-select" value={props.sortOrder} onChange={function(e) { props.setSortOrder(e.target.value) }}>
            <option value="default">Sort: Recommended</option>
            <option value="az">Name: A to Z</option>
            <option value="za">Name: Z to A</option>
          </select>
        </div>
      </div>
    </section>
  );
}

