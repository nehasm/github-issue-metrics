import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/fetch-api';
import { useParams } from 'react-router-dom';
import StateWise from './metrics/StateWise';
import WeekWise from './metrics/WeekWise';
import ClosureRate from './metrics/ClosureRate';
import {calculateSinceTimestamp ,getMetricsData} from '../services/metrics';
import IssueRatio from './metrics/IssueRatio';


const apiService = new ApiService();

function MetricMain() {
  const [metrics, setMetrics] = useState({});
  const [issue,setIssues] = useState([])
  const [loading, setLoading] = useState(false);
  const { owner, repoName } = useParams();

  // we are fetching 1000 issue for the metrics
  const fetchIssuesForMetrics = async () => {
    let time = calculateSinceTimestamp();
    let page = 1;
    try {
      let allIssues = [];
      setLoading(true)
      while (page <= 10) {
        
        const response = await apiService.request(owner, repoName,time,1,'desc');
        if (response.length === 0) {
          // No more issues to fetch
          break;
        }
        allIssues = [...allIssues, ...response];
        page++;
      }
      setIssues(allIssues)
      if(setIssues.length > 0) {
        setMetrics(getMetricsData(allIssues));
      }
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchIssuesForMetrics();
  }, []);

  return (
    <div className='m-auto 2xl:w-2/4 xl:w-3/5 lg:w-3/5 md:w-3/5 sm:w-4/5 w-[90%]'>
      <div className='p-6 text-center text-[#298fca] text-2xl border-b border-solid border-[#7b8e9f]'>Metrics</div>
      {issue?.length > 0 ? 
      <div>
      <div className='p-8'>
        <div className='text-[#298fca] p-4 text-xl text-center'>State wise chart</div>
        <div className='flex flex-col text-sm'>
            <span>Open issues count: {metrics.openCount}</span>
            <span>Closed issues count: {metrics.closedCount}</span>
        </div>
        <div className='h-[50vh] flex justify-center'>
            <StateWise metrics={metrics} /></div>
    </div>

      <div className='p-8'>
      <div className='text-[#298fca] p-4 text-xl text-center'>Week wise issue count</div>
      <div className='h-[50vh] flex justify-center'><WeekWise metrics={metrics}/></div>
      </div>

      <div className='p-8'>
      <div className='text-[#298fca] p-4 text-xl text-center'>New Issue vs Closed Issue in a week</div>
      <div className='h-[50vh] flex justify-center'><IssueRatio metrics={metrics}/></div>
      </div>
      <div className='p-8'>
      <div className='text-[#298fca] p-4 text-xl text-center'>Weekly Closure Rate</div>
    <div className='h-[50vh] flex justify-center'><ClosureRate metrics={metrics}/></div>
        </div>
        </div> : <div className='p-5 text-center text-lg'> {loading ? 'Loading...': 'No Issues found'}</div>}
    </div>
  );
}

export default MetricMain;
