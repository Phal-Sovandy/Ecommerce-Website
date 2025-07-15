import "../../../styles/customer/component-styles/shops/SideBar.css";

const ALL_CATEGORIES = [
  "electronics",
  "clothing",
  "home & kitchen",
  "beauty & personal care",
  "sports & outdoors",
  "toys & games",
  "books",
  "automotive",
  "baby",
  "health & household",
  "Hunting & fishing",
];

const ALL_DEPARTMENT = [
  "men",
  "women",
  "kids",
  "unisex",
  "sport",
  "office",
  "music",
  "game",
  "outdoor",
  "electronic",
];

function SideBar({ filters, setFilters, showSideBar }) {
  function handleAvailabilityChange() {
    setFilters((f) => ({ ...f, available: !f.available }));
  }

  function handleCategoryChange(category) {
    setFilters((f) => {
      const newCategories = f.categories?.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category];
      return { ...f, categories: newCategories };
    });
  }

  function handlePriceRangeChange(priceRange) {
    setFilters((f) => ({ ...f, priceRange }));
  }

  function handleDepartmentChange(department) {
    setFilters((f) => {
      const currentDepartments = f.department || [];
      const newDepartments = currentDepartments.includes(department)
        ? currentDepartments.filter((d) => d !== department)
        : [...currentDepartments, department];
      return { ...f, department: newDepartments };
    });
  }

  return (
    <aside className={showSideBar ? "" : "hide-side-bar"}>
      <div>
        <div className="constraint available">
          <h3>By Availability</h3>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={filters.available}
                  onChange={handleAvailabilityChange}
                />
                Available In Stock
              </label>
            </li>
          </ul>
        </div>

        <div className="constraint type">
          <h3>By Product Category</h3>
          <ul>
            {ALL_CATEGORIES.map((category) => (
              <li key={category}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category[0].toUpperCase() + category.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="constraint type">
          <h3>By Product Department</h3>
          <ul>
            {ALL_DEPARTMENT.map((dept) => (
              <li key={dept}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.department?.includes(dept)}
                    onChange={() => handleDepartmentChange(dept)}
                  />
                  {dept[0].toUpperCase() + dept.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="constraint price">
          <h3>By Product Price</h3>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === null}
                  onChange={() => handlePriceRangeChange(null)}
                />
                None
              </label>
            </li>
            {[
              [0, 10],
              [10, 50],
              [50, 100],
              [100, 150],
              [150, 200],
              [200, null],
            ].map((range, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters.priceRange?.[0] === range[0] &&
                      filters.priceRange?.[1] === range[1]
                    }
                    onChange={() => handlePriceRangeChange(range)}
                  />
                  {`$${range[0]} - ${range[1] ? "$" + range[1] : "above"}`}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
