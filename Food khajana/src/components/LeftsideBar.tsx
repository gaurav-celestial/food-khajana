import RangeSelector from "../small components/RangeSelector";

const LeftsideBar = ({ handleFilterChange, handleRangeFilterChange }) => {
  return (
    <>
      <div className="diet-filter filter">
        <h2>Diet</h2>
        <div className="input-group">
          <input
            type="checkbox"
            id="gluten-free"
            name="gluten-free"
            value="gluten-free"
            onChange={() => {
              handleFilterChange("diet", "gluten_free");
            }}
          />
          <label htmlFor="gluten-free"> gluten free</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="vegetarian"
            name="vegetarian"
            value="vegetarian"
            onChange={() => {
              handleFilterChange("diet", "vegetarian");
            }}
          />
          <label htmlFor="vegetarian"> vegetarian</label>
        </div>
      </div>

      <div className="ready-in-filter filter">
        <h2>Ready In</h2>
        <div className="input-group">
          <input
            type="checkbox"
            id="10mins"
            name="10mins"
            value="10 mins"
            onChange={() => {
              handleFilterChange("ready_in", "<_10_minutes");
            }}
          />
          <label htmlFor="10mins"> &lt; 10 minutes</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="20mins"
            name="20mins"
            value="20 min"
            onChange={() => {
              handleFilterChange("ready_in", "<_20_minutes");
            }}
          />
          <label htmlFor="20mins"> &lt; 20 minutes</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="30mins"
            name="30mins"
            value="30 min"
            onChange={() => {
              handleFilterChange("ready_in", "<_30_minutes");
            }}
          />
          <label htmlFor="30mins"> &lt; 30 minutes</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="1hour"
            name="1hour"
            value="1 hour"
            onChange={() => {
              handleFilterChange("ready_in", "<_60_minutes");
            }}
          />
          <label htmlFor="1hour"> &lt; 1 hour</label>
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="1.5hours"
            name="1.5hours"
            value="1.5 hours"
            onChange={() => {
              handleFilterChange("ready_in", "<_90_minutes");
            }}
          />
          <label htmlFor="1.5hours"> &lt; 1.5 hours</label>
        </div>
      </div>

      <div className="calories-filter range-filter">
        <RangeSelector
          type="Calories"
          handleRangeFilterChange={handleRangeFilterChange}
          min={10}
          max={1000}
        />
      </div>

      <div className="protein-filter range-filter">
        <RangeSelector
          type="Protein"
          handleRangeFilterChange={handleRangeFilterChange}
          min={0.1}
          max={100}
        />
      </div>

      <div className="fat-filter range-filter">
        <RangeSelector
          type="Fat"
          handleRangeFilterChange={handleRangeFilterChange}
          min={0.1}
          max={100}
        />
      </div>

      <div className="carbs-filter range-filter">
        <RangeSelector
          type="Carbs"
          handleRangeFilterChange={handleRangeFilterChange}
          min={0.1}
          max={100}
        />
      </div>
    </>
  );
};

export default LeftsideBar;
