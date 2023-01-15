import React, {useCallback, useEffect, useState} from 'react';
import axios from '../api/axios';
import Select from 'react-select';

const CategorySelect = (props) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback( async () => {
    try {
        const { data } = (await axios.get('api/categories'));
        if(data && Array.isArray(data)){
          setCategories(data.map((category) => {
            return { value: category.id, label: category.name }
          }));
        }else{
          props.setError(`Unexpected category response data`);
        }
    } catch (err) {
        props.setError(err.message);
    }
  },[props]);

  useEffect(() => {
    fetchCategories().then(r => r);
  }, [props, fetchCategories]);

  return (
    <Select options={categories} placeholder="Select a category" onChange={props.onChange} value={props.selectedCategory} isClearable={true} />
  );
}

export default CategorySelect;
