export const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--color-header)",
    // height: "48px",
    fontSize: "1.6rem",
    border: "1px solid var(--input-border)",
    borderRadius: "0.3rem",
    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    color: "black",
    boxShadow: "none",
    "&:hover": {
      // borderColor: "red",
    },
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: "var(--color-header)",
  }),
  // option: (provided) => ({
  //   ...provided,
  //   color: "var(--color-nav-link)",
  //   // color: "inherit"
  //   "&:hover": {
  //     backgroundColor: "var(--color-header-even)",
  //   },
  // }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 16,
    backgroundColor: state.isSelected ? "var(--color-header-even)" : "inherit",
    "&:hover": {
      backgroundColor: "var(--color-header-even)",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-nav-link)",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "var(--input-border)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--input-border)",
  }),
  group: (base) => ({
    ...base,
    backgroundColor: "green",
    color: "red",
  }),
};

// export const extended = {
//   ...customStyles,
//   input: (base) => ({
//     ...base,
//     color: "red",
//   }),
// };
