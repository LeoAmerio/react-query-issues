import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Issue, State } from '../interfaces'
import { sleep } from '../../helpers'
import { githubApi } from '../../api/githubApi'

interface Props {
  state?: State
  labels: string[]
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props) [];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  const [,, args] = queryKey;
  const { state, labels } = args as Props;
  
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', pageParam.toString());
  params.append('per_page', '10')

  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
}

export const useIssuesInfinite = ({ state, labels }: Props) => {

  const issueQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels, page: 1 }],
    (data) => getIssues( data ),
    {

    }
  )

  return {
    issueQuery
  }
}
