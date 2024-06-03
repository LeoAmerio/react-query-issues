import React from 'react'
import { Issue, State } from '../interfaces'
import { githubApi } from '../../api/githubApi'
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));

  params.append('page', '1');
  params.append('per_page', '10')

  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
}

export const useIssues = ({ state, labels }: Props) => {
  const { data, error, isLoading, isError, isFetched } = useQuery(
    ['issues', { state, labels }],
    () => getIssues(labels, state)
  )  

  return {
    data, error, isLoading, isError, isFetched
  }
}

