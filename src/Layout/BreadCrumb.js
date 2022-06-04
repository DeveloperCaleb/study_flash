import React from "react";

function Breadcrumb({ crumbs, selected }) {
  function isLast(index) {
    return index === crumbs.length - 1;
  }

  return (
    <nav className="row justify-content-center mt-4">
      <ol className="breadcrumb">
        {crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? "disabled" : "";

          return (
            <li key={ci} className="breadcrumb-item align-items-center">
              <button
                className={`btn btn-link ${disabled}`}
                onClick={() => selected(crumb)}
              >
                {crumb}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
