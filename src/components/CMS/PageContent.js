import React from 'react';

const PageContent = ({ sourceHtml }) => {
  let htmlObject = { __html: sourceHtml };
  debugger;
  return <div dangerouslySetInnerHTML={htmlObject} />;
};

export default PageContent;
