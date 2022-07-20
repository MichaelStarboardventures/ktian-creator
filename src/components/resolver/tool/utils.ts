export const getBorder = (hovered: boolean, selected: boolean) => {
  if (selected) return `1px solid #5a5a5a`;

  if (hovered) return `1px dashed #5a5a5a`;

  return `1px solid transparent`;
};
