import React from 'react';

interface Props {
  onSelectOption: (option: string) => void;
}

const LoanOptions: React.FC<Props> = ({ onSelectOption }) => {
  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div className="loan-options">
      <button onClick={() => handleOptionClick('Apply for a loan')}>
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
