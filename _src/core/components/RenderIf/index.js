const RenderIf = ({condition, children}) => {
  if (condition) {
    return children;
  }
  return null;
};

export default RenderIf;
