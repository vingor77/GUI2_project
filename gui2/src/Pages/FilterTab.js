import React, { useContext } from "react";
import DataContext from '../contexts/DataContext';

const FilterPage = ({ user }) => {
  const data = useContext(DataContext);
  return (
    <div>
    Filtering is available to <em>premium</em> members only.
    </div>
  );
};

export default FilterPage;
