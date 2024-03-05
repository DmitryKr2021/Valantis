import axios from 'axios';
import md5 from 'md5';
import store from '../slices/index';
import setBody from './loadParams';
import { loadBrands, loadItems } from '../slices/goods';

const runLoader = (param) => {
  const { dispatch } = store;
  const currentDate = new Date();
  const password = 'Valantis';
  const xAuth = password.concat(
    '_',
    currentDate.getUTCFullYear().toString(),
    (currentDate.getUTCMonth() + 1).toString().padStart(2, '0'),
    currentDate.getUTCDate().toString().padStart(2, '0'),
  );
  const hash = md5(xAuth);
  const baseUrl = 'https://api.valantis.store:41000/';
  const body = setBody(param);
  const repeat = 3;
  let count = 0;

  const handleFiltered = (result) => {
    const { goods, filterParams } = store.getState().goodsSlice;
    const { name, price, brand } = filterParams;
    let filteredGoods;
    if (price === '' || brand === '') {
      if (name === '') {
        filteredGoods = goods.result.filter((item) => result.includes(item.id));
      } else {
        filteredGoods = goods.result.filter(
          (item) => result.includes(item.id) && item.product.indexOf(name) >= 0,
        );
      }
    } else if (name === '') {
        filteredGoods = goods.result.filter(
          (item) => result.includes(item.id) && item.brand === brand,
        );
      } else {
        filteredGoods = goods.result.filter(
          (item) =>
            result.includes(item.id) &&
            item.brand === brand &&
            item.product.indexOf(name) >= 0,
        );
      }

    if (price === '' && brand === '' && name !== '') {
      filteredGoods = goods.result.filter(
        (item) => item.product.indexOf(name) >= 0,
      );
    }
    localStorage.setItem(
      'ids',
      JSON.stringify(filteredGoods.map((item) => item.id)),
    );
    runLoader('items');
  };

  const requestData = () => {
    count += 1;
    if (count < repeat) {
      axios({
        method: 'post',
        url: baseUrl,
        data: body,
        headers: {
          'X-Auth': hash,
          'Content-Type': 'application/json',
        },
        timeout: 25000, // Ограничение времени ожидания запроса
      })
        .then((response) => {
          const { data } = response;
          switch (param) {
            case 'brand':
              dispatch(loadBrands(data));
              break;
            case 'allIds':
              {
                const ids = data.result;
                localStorage.setItem('ids', JSON.stringify(ids));
                localStorage.setItem('allIds', JSON.stringify(ids));
              }
              break;
            case 'allItems':
              dispatch(loadItems(data));
              break;
            case 'items':
              dispatch(loadItems(data));
              break;
            case 'filtered':
              handleFiltered(data.result);
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          requestData();
        });
    }
  };

  requestData();
};

export default runLoader;
