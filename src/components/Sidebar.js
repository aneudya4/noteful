import React from 'react';

const Sidebar = (props) => {
  return <div className={props.className}>{props.children}</div>;
};
export default Sidebar;
