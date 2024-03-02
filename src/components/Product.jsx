import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Pagination } from 'react-bootstrap';
import { pageToShow } from '../slices/goods';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const Product = () => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const [startValues, setStartValues] = useState([1, 10, 11, 12, 13, 14, 20]);
  const goods = useSelector((state) => state.goodsSlice.goods);
  const pageNumber = useSelector((state) => state.goodsSlice.pageNumber);
  const { result } = goods;

  if (goods.length === 0) {
    return null;
  }

  const uniqResult = _.uniqBy(result, 'id');
  const maxPerPage = 50;
  const amountPages = Math.ceil(uniqResult.length / maxPerPage);

  const handleClick = (e) => {
    dispatch(pageToShow(e.target.textContent));
    setActive(+e.target.textContent);
  };

  const items = [];
  for (let number = 1; number <= amountPages; number += 1) {
    items.push(
      <Pagination.Item key={number} id={number} active={number === active}>
        <div onClick={handleClick} className="digit">
          {number}
        </div>
      </Pagination.Item>,
    );
  }

  const initialValues = [1, 10, 11, 12, 13, 14, 20];
  const ap = amountPages;
  const finishValues = [ap - 19, ap - 10, ap - 9, ap - 8, ap - 7, ap - 6, ap];

  const handleClickFirst = () => {
    setStartValues(initialValues);
    setActive(1);
    dispatch(pageToShow(1));
  };

  const handleClickPrev = () => {
    if (startValues[0] > 1) {
      setStartValues(startValues.map((value) => value - 1));
    }
  };

  const handleClickNext = () => {
    if (startValues[6] < amountPages) {
      setStartValues(startValues.map((value) => value + 1));
    }
  };

  const handleClickLast = () => {
    setStartValues(finishValues);
    setActive(amountPages);
    dispatch(pageToShow(amountPages));
  };

  const pagination = () =>
    amountPages <= 20 ? (
      <Pagination>{items}</Pagination>
    ) : (
      <Pagination>
        <Pagination.First onClick={handleClickFirst} />
        <Pagination.Prev onClick={handleClickPrev} />
        <Pagination.Item
          onClick={handleClick}
          active={startValues[0] === active}
        >
          {startValues[0]}
        </Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item
          onClick={handleClick}
          active={startValues[1] === active}
        >
          {startValues[1]}
        </Pagination.Item>
        <Pagination.Item
          onClick={handleClick}
          active={startValues[2] === active}
        >
          {startValues[2]}
        </Pagination.Item>
        <Pagination.Item
          onClick={handleClick}
          active={startValues[3] === active}
        >
          {startValues[3]}
        </Pagination.Item>
        <Pagination.Item
          onClick={handleClick}
          active={startValues[4] === active}
        >
          {startValues[4]}
        </Pagination.Item>
        <Pagination.Item
          onClick={handleClick}
          active={startValues[5] === active}
        >
          {startValues[5]}
        </Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item
          onClick={handleClick}
          active={startValues[6] === active}
        >
          {startValues[6]}
        </Pagination.Item>
        <Pagination.Next onClick={handleClickNext} />
        <Pagination.Last onClick={handleClickLast} />
      </Pagination>
    );

  const Pages = [];
  for (let i = 0; i < amountPages; i += 1) {
    const Page = () => (
      <div className="cards ms-3 d-flex flex-wrap justify-content-between overflow-auto align-content-start">
        {uniqResult.map((item, index) => {
          if (index >= i * maxPerPage && index < (i + 1) * maxPerPage) {
            const { brand, id, price, product } = item;
            return (
              <div key={id} className="card shadow p-2 text-center">
                <div className="brand">{brand}</div>
                <div className="small">{id}</div>
                <div>{price}</div>
                <div className="text-warning">{product}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
    Pages.push(Page);
  }

  return (
    <>
      <div>
        {Pages.map((Page, index) => (
          <div
            className={index === pageNumber - 1 ? 'd-block' : 'd-none'}
            key={index}
          >
            <Page />
          </div>
        ))}
      </div>
      <div className="mt-2 ps-2">{pagination()}</div>
    </>
  );
};

export default Product;
