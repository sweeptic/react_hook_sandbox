import React, { useContext, useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from './../UI/LoadingIndicator';
import { AuthContext } from '../../auth-context';

const IngredientForm = React.memo(({ addIngredientHandler, loading }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const authContext = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();
    addIngredientHandler({ name, amount });
  };

  const loginHandler = () => {
    authContext.login();
  };

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              id='title'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
            {loading && <LoadingIndicator />}
          </div>
        </form>
        <button onClick={loginHandler}>Login / Logout</button>
      </Card>
    </section>
  );
});

export default IngredientForm;
