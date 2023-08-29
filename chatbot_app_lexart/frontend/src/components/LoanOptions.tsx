import React, { useState } from 'react';
import styles from '../styles/Loan.module.css'

interface Props {
  onSelectOption: (option: string) => void;
}

const LoanOptions: React.FC<Props> = ({ onSelectOption }) => {
  const [showLoanConditions, setShowLoanConditions] = useState(false);
  const [showRandomLoanLink, setShowRandomLoanLink] = useState(false);
  const [showHelpLink, setShowHelpLink] = useState(false);

  const loanLinks = [
    'https://www.investopedia.com/articles/personal-finance/010516/how-apply-personal-loan.asp',
    'https://www.experian.com/blogs/ask-experian/if-you-apply-for-a-personal-loan-do-you-have-to-take-it/',
  ];

  const helpLink = 'https://www.citizensadvice.org.uk/debt-and-money/borrowing-money/types-of-borrowing/loans/';

  const handleOptionClick = (option: string) => {
    onSelectOption(option);
    if (option === 'Loan conditions') {
      setShowLoanConditions(true);
      setShowRandomLoanLink(false);
      setShowHelpLink(false);
    } else if (option === 'Ok, lets do it. Click on the link below to make your loan!') {
      setShowLoanConditions(false);
      setShowRandomLoanLink(true);
      setShowHelpLink(false);
    } else if (option === 'Help') {
      setShowLoanConditions(false);
      setShowRandomLoanLink(false);
      setShowHelpLink(true);
    } else {
      setShowLoanConditions(false);
      setShowRandomLoanLink(false);
      setShowHelpLink(false);
    }
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

      {showLoanConditions && (
        <div>
          <p>
          Loan terms pertain to the stipulations and provisions associated with borrowing funds. These encompass the duration within which the borrowed amount needs to be repaid, the applicable interest rate and accompanying charges, potential penalties that borrowers might incur, and any additional specific requirements that could be relevant. Diligently examining the loan terms holds significant importance in comprehending your responsibilities upon securing a loan. Access the provided link to explore all the applicable conditions!
          </p>
          <a href="https://lexartlabs.com/for-developers/" target="_blank" rel="noopener noreferrer">
            Click here to view the loan conditions
          </a>
        </div>
      )}

      {showRandomLoanLink && (
        <div>
          <a href={loanLinks[Math.floor(Math.random() * loanLinks.length)]} target="_blank" rel="noopener noreferrer">
            Click here to apply for a random loan
          </a>
        </div>
      )}

      {showHelpLink && (
        <div>
          <a href={helpLink} target="_blank" rel="noopener noreferrer">
            Click here to learn more about loans
          </a>
        </div>
      )}
    </div>
  );
};

export default LoanOptions;
