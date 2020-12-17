import React, { FC, Ref, forwardRef, useState } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';

interface Props {
  /**
   * Sets the type of input being used
   */
  type?: 'checkbox';

  /**
   * Disables interaction with checkbox. Default: false
   */
  disabled?: boolean;

  /**
   * For delete options in the menu
   */
  color?: boolean;

  /**
   * Value that would be sent to the form on submit
   */
  value?: string;

  /**
   * Determines the initial state of the checkbox. Default: false
   */
  checked?: boolean;

  /**
   * Use to tag the input within the Checkbox
   */
  id?: string;

  /**
   * Register callback for click event
   */
  onClick?: () => void;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: FC<Props> = forwardRef((props, ref) => {
  const {
    onClick,
    value = 'Checkbox',
    disabled = false,
  } = props;
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const checkbox = classNames(
    styles.checkbox,
    { [styles.disabled]: disabled },
  );

  return (
    <label className={checkbox}>
      <span className={styles.checkboxControl}>
        <input
          type='checkbox'
          name='acceptsmarketing'
          ref={ref}
          checked={isChecked}
          onClick={onClick}
          onChange={handleCheckboxChange}
          disabled={disabled}
        />
        <svg
          width='11'
          height='8'
          viewBox='0 0 11 8'
          fill='none'
          aria-hidden='true'
          focusable='false'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d={classNames('M10.0608 1.44085L4.16916 7.33335L0.633331 3.79751L1.81166',
              '2.61918L4.16916 4.97668L8.8825 0.262512L10.0608 1.44085Z')}
          />
        </svg>
      </span>

      <span className={styles.label}>{value ?? 'Checkbox'}</span>
    </label>
  );
});

export default Checkbox;
