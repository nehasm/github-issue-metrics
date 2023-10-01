import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../services/fetch-api';
import ReactDOM from 'react-dom';
import { FwDataTable,FwRadio } from '@freshworks/crayons/react';

const apiService = new ApiService();

const List = () => {
  const [issues, setIssues] = useState([]);
  const currentPageRef = useRef(1); // Ref for current page number
  const sortDirRef = useRef('desc'); // Ref for current page number
  const itemsPerPage = 100; // Number of items to display per page (fixed)
  const [loading, setLoading] = useState(false);
  const { owner, repoName } = useParams();

  useEffect(() => {
  // Fetch issues for the current page when the component mounts
    fetchIssuesForPage(currentPageRef.current,sortDirRef.current);
  }, [owner, repoName]);

  // Function to handle page change (Previous)
  const handlePreviousPage = () => {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      fetchIssuesForPage(currentPageRef.current,sortDirRef.current);
    }
  };

  // Function to handle page change (Next)
  const handleNextPage = () => {
    currentPageRef.current += 1;
    fetchIssuesForPage(currentPageRef.current,sortDirRef.current);
  };

      // Function to fetch issues for the specified page
      const fetchIssuesForPage = async (page,sort) => {
        try { 
          setLoading(true)
          const response = await apiService.request(owner, repoName,null, page, sort);
          // Map the response data to include only the required fields
          const formattedIssues = response.map((issue) => ({
            state: issue.state,
            title: issue.title,
            created_at: issue.created_at,
            updated_at: issue.updated_at,
          }));
          setIssues(formattedIssues);
          setLoading(false)
        } catch (error) {
          console.error('Error:', error);
          
        }
      };



  let data = {
    columns: [
      {
        "key": "state",
        "text": "Status",
        "widthProperties": {
          "width": "60px"
        }
      },
      {
        "key": "title",
        "text": "Title",
        "widthProperties": {
          "width": "200px"
        }
      },
      {
        "key": "created_at",
        "text": "Created At",
        "widthProperties": {
          "width": "80px"
        }
      },
      {
        "key": "updated_at",
        "text": "Updated At",
        "widthProperties": {
          "width": "80px"
        }
      }
    ],
    persons: issues // Use the issues data
  };

  const sortByCreationDate = (val) => {
    sortDirRef.current = val
    currentPageRef.current = 1
    fetchIssuesForPage(currentPageRef.current,sortDirRef.current);
  }

  return (
    <div className='m-auto w-3/5'>
      <div className='p-6 text-center text-[#298fca] text-2xl border-b border-solid'>
        List of Issues
      </div>
      <div className='flex my-4 justify-between'>
        <div className='flex'>
        <div className='mx-2 text-gray-500 cursor-pointer' onClick={handlePreviousPage}>{`< Previous`}</div>
        <div className='mx-2'>{`Page ${currentPageRef.current}`}</div>
        <div className='mx-2 text-gray-500 cursor-pointer' onClick={handleNextPage}>{`Next >`}</div>
        </div>

        <div><FwRadio checked={sortDirRef.current === 'asc'} onFwChange={() => sortByCreationDate('asc')}>Ascending</FwRadio> <FwRadio checked={sortDirRef.current === 'desc'}  onFwChange={() => sortByCreationDate('desc')}>Decending</FwRadio>
        <div className='text-[12px] text-gray-400'>The table is already sorted based on creation date. However, you can change the direction of sort</div></div>
      </div>
      <div className='my-8 border border-solid border-solid border-[#7b8e9f]'>
        {issues.length > 0 ? 
        <FwDataTable
          columns={data.columns}
          rows={data.persons}
          label="Data Table 1"
        /> : <div className='text-lg p-5 text-center'>{loading ? 'Loading...' : 'No issues found'}</div>}
      </div>
    </div>
  );
};

export default List;
