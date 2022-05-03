import React, { useState } from 'react';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import style from './RepositoryItem.module.css';

export const RepositoryItem = ({ data, isChecked = false, onCheck = (value) => {} }) => {
  const { name, nameWithOwner } = data.node;
  const [checked, setChecked] = useState(isChecked);
  const link = `https://github.com/${nameWithOwner}`;

  const handleCheckBoxClick = () => {
    const value = !checked;
    setChecked(value);
    onCheck(value);
  };

  return (
    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div className={`${style.checkbox} ${checked && style.active}`} onClick={handleCheckBoxClick}>
        {checked ? (
          <CheckCircleIcon className="h-5 w-5" />
        ) : (
          <DotsCircleHorizontalIcon className="h-5 w-5" />
        )}
      </div>
      <div className="w-0 flex-1 flex items-center">
        <span className="ml-2 flex-1 w-0 truncate">{name}</span>
      </div>
      <div className="ml-4 flex-shrink-0 float-right">
        <a className="text-sky-600 hover:underline" href={link}>
          {link}
        </a>
      </div>
    </li>
  );
};
