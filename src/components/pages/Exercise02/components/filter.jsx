import React from 'react';

export const Filter = ({ filters, selectFilter, order, onChangeOrder }) => {

  const labelOrder = {
    asc: "Order Ascending",
    desc: "Order Descending"
  }

  const onSelectFilter = (event) => selectFilter(event.target.value)

  return (
    <div className="movie-library__actions">
      <select name="genre" placeholder="Search by genre..." onChange={onSelectFilter} >
        <option value="">Todos las categorías</option>
        {filters.map( (filter, i) => <option key={i} value={filter}>{filter}</option>)}
      </select>
      <button onClick={() => onChangeOrder(order === "desc" ? "asc" : "desc")} >{labelOrder[order]}</button>
    </div>
  );
}