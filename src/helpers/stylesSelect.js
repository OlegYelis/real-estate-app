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

export const mainStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "100%",
    height: "64px",
    borderRadius: "12px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
};

export const listStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    border: "none",
    width: "300px",
    height: "64px",
    borderRadius: "12px",
    padding: "0 10px",
    outline: "none",
    color: "#2a2a2a",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? "#f4f4f4" : "#2a2a2a",
  }),
};
