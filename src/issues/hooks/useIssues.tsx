import React from 'react'
import { Issue } from '../interfaces'
import { githubApi } from '../../api/githubApi'
import { useQuery } from '@tanstack/react-query';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
}

export const useIssues = () => {
  const { data, error, isLoading, isError, isFetched } = useQuery(
    ['issues'],
    getIssues
  )  

  return {
    data, error, isLoading, isError, isFetched
  }
}

