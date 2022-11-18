// on KeyDown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
};

// on Input Value When Click
export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
  // document.execCommand("selectAll", false, null);
};
