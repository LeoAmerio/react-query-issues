import React, { useEffect, useState } from 'react'
import { Issue, State } from '../interfaces'
import { githubApi } from '../../api/githubApi'
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
  page?:  number;
}

const getIssues = async ({labels, state, page = 1}: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', page.toString());
  params.append('per_page', '10')

  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
}

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1);
  }, [state, labels])
  

  const issueQuery = useQuery(
    ['issues', { state, labels, page }],
    () => getIssues({labels, state, page})
  )

  const nextPage = () => {
    if (issueQuery.data?.length === 0) return;
    setPage(page + 1);
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  }

  return {
    issueQuery,
    page: issueQuery.isFetching ? 'Loading...' : page,
    nextPage,
    prevPage
  }
}

