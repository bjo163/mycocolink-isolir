import React from 'react';
import { subscriptionStateMap } from '../utils/subscriptionStateMap';

const YourComponent = () => {
  const stateList = ['1_draft', '2_renewal', '3_progress', '4_paused', '5_renewed', '6_churn', '7_upsell'];

  return (
    <div>
      {stateList.map(state => (
        <div key={state}>
          {state} - {subscriptionStateMap[state]}
        </div>
      ))}
    </div>
  );
};

export default YourComponent;