import { useState } from "react";
import { IssueList, LabelPicker } from "../components";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issueQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issueQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issueQuery.data || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button className="btn btn-outline-primary" onClick={prevPage} >
            Previous
          </button>
          <span>{page}</span>
          <button className="btn btn-outline-primary" onClick={nextPage} disabled={issueQuery.isFetching}>
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
