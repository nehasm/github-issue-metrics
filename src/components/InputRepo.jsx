import React from 'react';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';

function InputRepo() {
    const navigate = useNavigate();
  const {value: owner, valueIsValid: ownerIsValid, hasError: ownerHasError, valueChangeHandler: ownerChangeHandler, inputBlurHandler: ownerBlurHandler, reset: ownerReset} = useInput();
  const {value: repoName, valueIsValid: repoNameIsValid, hasError: repoNameHasError, valueChangeHandler: repoNameChangeHandler, inputBlurHandler: repoNameBlurHandler, reset: repoNameReset} = useInput();
  let isRepoDetailsValid = false;
  if (ownerIsValid && repoNameIsValid) {
    isRepoDetailsValid = true;
  }
  const showMetrics = () => {
    navigate(`/metrics/${owner}/${repoName}`);
    console.log('Checking Metrics');
  }
  const showIssues = () => {
    // Handle the logic to show issues here
    navigate(`/issues/${owner}/${repoName}`);
    console.log('Showing Issues');
  }

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='m-auto xl:w-2/5 lg:w-3/5 md:w-3/5 sm:w-4/5 w-[90%]'>
    <div className="shadow-xl rounded-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Organisation *</label>
        <input
          type='text'
          value={owner}
          onChange={ownerChangeHandler}
          onBlur={ownerBlurHandler}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8AAAE5] ${ownerHasError ? 'border-red-500' : ''}`}
          placeholder="Enter owner"
        />
        {ownerHasError && <p className="text-red-500 text-xs mt-1">Please enter a valid organisation.</p>}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Repository Name *</label>
        <input
          type='text'
          value={repoName}
          onChange={repoNameChangeHandler}
          onBlur={repoNameBlurHandler}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8AAAE5] ${repoNameHasError ? 'border-red-500' : ''}`}
          placeholder="Enter repo name"
        />
        {repoNameHasError && <p className="text-red-500 text-xs mt-1">Please enter a valid repository name.</p>}
      </div>
      <div className="mb-6">
        <button
          disabled={!isRepoDetailsValid}
          onClick={showMetrics}
          type='submit'
          className={`w-full bg-blue-500 text-white py-2 rounded-lg ${!isRepoDetailsValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8AAAE5] cursor-pointer'}`}
        >
          Show Metrics
        </button>
        <button
          disabled={!isRepoDetailsValid}
          onClick={showIssues}
          type='submit'
          className={`w-full mt-2 bg-blue-500 text-white py-2 rounded-lg ${!isRepoDetailsValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8AAAE5] cursor-pointer'}`}
        >
          Show Issues
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default InputRepo;
