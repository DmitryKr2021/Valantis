import store from '../slices/index';

const setBody = (target) => {
  switch (target) {
    case 'brand':
      return {
        action: 'get_fields',
        params: { field: 'brand' },
      };

    case 'allIds':
      return {
        action: 'get_ids',
        params: { limit: 5000 },
      };

    case 'allItems':
      return {
        action: 'get_items',
        params: { ids: JSON.parse(localStorage.getItem('allIds')) },
      };

    case 'items':
      return {
        action: 'get_items',
        params: { ids: JSON.parse(localStorage.getItem('ids')) },
      };

    case 'filtered':
      {
        const { filterParams } = store.getState().goodsSlice;
        const { name, price, brand } = filterParams;
        if (price !== '') {
          return {
            action: 'filter',
            params: { price: +price },
          };
        }
        if (brand !== '') {
          return {
            action: 'filter',
            params: { brand },
          };
        }
        if (name !== '') {
          return {
            action: 'get_items',
            params: { ids: JSON.parse(localStorage.getItem('allIds')) },
          };
        }
        return null;
      }
    default:
      return null;
  }
};

export default setBody;
