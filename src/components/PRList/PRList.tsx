import { useFetchPRs } from "../../hooks/useFetchPRs";
import { useState } from "react";
import "./PRList.css";

const PRList = () => {
  const { data: prs, isLoading, error } = useFetchPRs();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error instanceof Error) {
    return <p>Failed to load PRs: {error.message}</p>;
  }

  const labels = [
    ...new Set(prs?.flatMap((pr) => pr.labels.map((label) => label.name))),
  ];

  const filteredPRs = selectedLabel
    ? prs?.filter((pr) =>
        pr.labels.some((label) => label.name === selectedLabel)
      )
    : prs;

  // Function to return the appropriate class for each label
  const getLabelClass = (labelName: string) => {
    switch (labelName.toLowerCase()) {
      case "bug":
        return "label-bug"; // Red color for Bug
      case "enhancement":
        return "label-enhancement"; // Green color for Enhancement
      default:
        return "label-default"; // Default label styling
    }
  };

  return (
    <div className="pr-container">
      <h2>Pull Requests</h2>

      <div>
        <button onClick={() => setSelectedLabel(null)} className="label-button">
          All
        </button>
        {labels?.map((label) => (
          <button
            key={label}
            onClick={() => setSelectedLabel(label)}
            className={`label-button ${
              selectedLabel === label ? "active" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="pr-list">
        {filteredPRs?.map((pr) => (
          <li key={pr.id} className="pr-item">
            <a
              href={pr.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="pr-link"
            >
              {pr.title}
            </a>
            <p>Opened on {new Date(pr.created_at).toLocaleDateString()}</p>
            <div>
              {pr.labels.map((label) => (
                <span
                  key={label.id}
                  className={`pr-label ${getLabelClass(label.name)}`}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PRList;
