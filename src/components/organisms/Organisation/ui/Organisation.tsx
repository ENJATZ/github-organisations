import React from 'react';
import { IOrganisation } from '../logic/OrganisationPageContainer.tsx';
import { RepositoryItem } from '../../../molecules/RepositoryItem/RepositoryItem.tsx';

export const Organisation = ({ data, checkedList, onCheck }: IOrganisation) => {
  const { login, description, avatarUrl, websiteUrl, createdAt, repositories } = data;

  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <img
          alt="Avatar"
          src={avatarUrl}
          className="h-10 w-10 rounded-full inline-block align-middle"
        />
        <div className="inline-block align-middle ml-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900" data-testid="login">
            {login}
          </h3>
          <a
            href={`https://github.com/${login}`}
            className="mt-1 max-w-2xl text-sm text-sky-600 hover:underline"
          >
            github.com/{login}
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Organization name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{login}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created at</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(createdAt).toLocaleDateString('en-US')}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Website URL</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{websiteUrl}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{description}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Repositories</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {repositories?.edges?.map((repo, index) => (
                  <RepositoryItem
                    key={`${index}-${checkedList[repo?.node.nameWithOwner]}`}
                    data={repo}
                    isChecked={checkedList[repo.node.nameWithOwner]}
                    onCheck={() => onCheck(repo.node.nameWithOwner)}
                  />
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

Organisation.Skeleton = () => {
  return <div className="p-10">Loading..</div>;
};
