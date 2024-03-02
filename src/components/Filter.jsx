import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import runLoader from '../utils/loader';
import { setFilterParams } from '../slices/goods';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

const Filter = () => {
  const brands = useSelector((state) => state.goodsSlice.brands);
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState('invisible');
  const handleEnter = () => {
    setTooltip('visible');
  };
  const handleLeave = () => {
    setTooltip('invisible');
  };

  const Schema = Yup.object().shape({
    price: Yup.number()
      .typeError('must be a number value')
      .integer('mast be an integer value'),
  });

  const [isReset, setIsReset] = useState(false);

  return (
    <div className="p-4">
      <h3 className="mb-4 text-center">Фильтр</h3>
      <Formik
        initialValues={{ name: '', price: '', brand: '' }}
        validationSchema={Schema}
        onSubmit={(values) => {
          if (Object.values(values).join('') !== '') {
            dispatch(setFilterParams(values));
            runLoader('filtered');
          };
          setIsReset(true);
          setTimeout(() => setIsReset(false), 1000);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          touched,
          resetForm,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="row d-flex justify-content-between">
              <div className={tooltip} style={{ color: '#aaa' }}>
                Введите фрагмент названия
              </div>
              <Form.Label htmlFor="name" className="col-sm-2 col-form-label">
                Название
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="кольцо"
                  onMouseEnter={(e) => handleEnter(e)}
                  onMouseLeave={(e) => handleLeave(e)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && errors.name}
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-4 row d-flex justify-content-between">
              <Form.Label htmlFor="brand" className="col-sm-1 col-form-label">
                Брэнд
              </Form.Label>
              <div className="col-sm-8">
                <Form.Select
                  aria-label="select"
                  id="brand"
                  value={isReset ? '' : values.brand}
                  onChange={handleChange}
                >
                  {brands.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mt-4 row d-flex justify-content-between">
              <Form.Label htmlFor="price" className="col-sm-1 col-form-label">
                Цена,&nbsp;руб
              </Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  id="price"
                  name="price"
                  placeholder="15000"
                  onChange={handleChange}
                  value={values.price}
                  isInvalid={touched.price && errors.price}
                />
                <ErrorMessage name="price">
                  {(msg) => <div className="invalid-tooltip">{msg}</div>}
                </ErrorMessage>
              </div>
            </Form.Group>

            <ButtonToolbar
              className="mt-4 d-flex justify-content-between"
              aria-label="Basic example"
            >
              <Button
                style={{ width: 120 }}
                variant="secondary"
                type="submit"
                className="mb-2"
              >
                Применить
              </Button>
              <Button
                style={{ width: 120 }}
                variant="secondary"
                onClick={() => {
                  resetForm();
                  dispatch(setFilterParams({}));
                  runLoader('allIds');
                  runLoader('allItems');
                }}
                className="mb-2"
              >
                Очистить
              </Button>
            </ButtonToolbar>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Filter;
