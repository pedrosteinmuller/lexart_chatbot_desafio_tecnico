import React from 'react';
import styles from '../styles/Loan.module.css'

interface Props {
  onSelectOption: (option: string) => void;
}

const LoanOptions: React.FC<Props> = ({ onSelectOption }) => {
  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div className={styles['loan-options']}>
      <button onClick={() => handleOptionClick(
        'Ok, lets do it. Click on the link below to make your loan!'
      )}>
        Do you want to apply for a loan?
      </button>
      <button onClick={() => handleOptionClick('Loan conditions')}>
        Loan conditions
      </button>
      <button onClick={() => handleOptionClick('Help')}>Help</button>
    </div>
  );
};

export default LoanOptions;
