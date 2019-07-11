import React from 'react';

const PageContent = ({ sourceHtml }) => {
  let htmlObject = { __html: sourceHtml };
  return <div dangerouslySetInnerHTML={htmlObject} />;
};

export default PageContent;
