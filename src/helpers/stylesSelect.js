export const selectStylesDeal = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "150px",
    height: "64px",
    borderRadius: "16px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
};

export const selectStylesProp = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "220px",
    height: "64px",
    borderRadius: "16px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#B8B8B8",
  }),
};

export const selectStylesRoom = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "140px",
    height: "64px",
    borderRadius: "16px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#B8B8B8",
  }),
};

export const selectStylesSort = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "270px",
    height: "64px",
    borderRadius: "16px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
};
