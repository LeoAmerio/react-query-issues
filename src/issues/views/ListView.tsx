import { useState } from 'react';
import { IssueList, LabelPicker } from '../components';
import { useIssue } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const issueQuery = useIssue();

  const onLabelChanged = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  }

  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issueQuery.isLoading
          ? <LoadingIcon /> 
          : <IssueList issues={ issueQuery.data || [] } />
        }
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
