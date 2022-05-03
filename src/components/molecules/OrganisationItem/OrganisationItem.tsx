import React from 'react';
import { Button } from '../../atoms/Button/Button.tsx';

export const OrganisationItem = ({ info }) => {
  const { login, avatarUrl, url } = info?.node || {};

  return (
    <div className="p-2 flex w-full justify-between items-center">
      <div className="w-[60rem]">
        <img
          src={avatarUrl}
          alt={`${login}'s avatar`}
          className="inline-block h-12 w-12 rounded-full"
          data-testid="avatar"
        />
        <div className="ml-2 inline-block align-top">
          <p className="text-lg font-regular">{login}</p>
          <a href={url} className="text-md font-regular text-sky-600 hover:underline">
            {url}
          </a>
        </div>
      </div>

      <div className="space-x-2">
        <a href={`/organization/${login}`}>
          <Button>View profile</Button>
        </a>
      </div>
    </div>
  );
};
