import React, { FC, useState, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';
import Checkbox from '../Checkbox/Checkbox';

interface Elements {
  value?: string;
  color?: boolean;
}

interface Props {
  /**
   * Identifier for form control
   */
  id?: string;
  /**
   * Disables interaction with checkbox. Default: false
   */
  disabled?: boolean;
  /**
   * Value that would be sent to the form on submit
   */
  value?: string;
  /**
   * Determines the initial state of the checkbox. Default: false
   */
  checked?: boolean;
  /**
   * Sets the initial state of the dropdown menu
   */
  open?: boolean;
  /**
   * Items to render on the options dropdown menu
   */
  options?: Array<Elements>;
  /**
   * Whether or not to render dropdown with a checkbox
   */
  checkbox?: boolean;
  /**
   * The displayed text when no selection has been made
   */
  placeholder?: string;
  /**
   * Register callback for click event
   */
  onClick?: () => void;
  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLSelectElement>;
}

interface Package {
  name: 'select';
  value: null | string | { option: string | null; value: boolean }[];
}

const pack: Package = { name: 'select', value: '' };

const Select: FC<Props> = forwardRef(({
  placeholder = 'Label',
  options: items,
  checkbox = false,
  open = false,
  disabled = false,
  id,
}, ref) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleDropdownOpen = () => setIsOpen(!isOpen);
  const menu = classNames(
    styles.menu,
    { [styles.disabled]: disabled },
  );

  React.useEffect(() => { if (typeof ref === 'function') ref(pack as HTMLSelectElement); }, []);
  const itemsReference: Array<React.RefObject<HTMLLIElement>> = items?.map(() => React.createRef()) ?? [];
  const [display, setDisplay] = React.useState<string | null>('');

  const handleClickEvent = (event: React.FormEvent<HTMLUListElement>) => {
    const target = event.currentTarget;
    const value = checkbox && [...target.children].map((child) => child.textContent);
    const checked = [...target.querySelectorAll('input[type="checkbox"]')]
      .map((item) => (item as HTMLInputElement).checked);

    if (Array.isArray(value)) {
      pack.value = value
        .filter((_, index) => checked[index])
        .map((option, index) => ({ option, value: checked[index] }), {});
      setDisplay(pack.value.map((item) => item.option).join(', '));
    }
  };

  const dropdown = (
    <ul
      className={styles.optionsMenu}
      onChange={handleClickEvent}
      onClickCapture={(event) => {
        const target = event.target as HTMLElement;
        if (!checkbox) setDisplay(target.textContent ?? '');
      }}
    >
      {
        items?.map((item, index) => {
          const classes = classNames(
            styles.option,
            { [styles.color]: item.color ?? false },
          );

          return (
            <li
              ref={itemsReference[index]}
              className={classes}
              key={index}
              tabIndex={index}
            >
              {
                checkbox ? <Checkbox {...item} /> : item.value
              }
            </li>
          );
        })
      }
    </ul>
  );

  return (
    <div className={styles.container} id={id}>
      <div className={menu} {...(!disabled && { onClick: handleDropdownOpen })}>
        <span className={styles.select}>{ display || placeholder }</span>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d={isOpen ? 'M12 10L8 14L16 14L12 10Z' : 'M12 14L8 10L16 10L12 14Z'} />
        </svg>
      </div>
      { isOpen && items && dropdown}
    </div>
  );
});

export default Select;
