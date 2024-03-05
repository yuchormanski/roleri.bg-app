export const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--color-header)",
    fontSize: "1.6rem",
    border: "1px solid var(--input-border)",
    borderRadius: "0.3rem",
    transition: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    color: "black",
    "&:hover": {
      borderColor: "red",
    },
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: "var(--color-header)",
  }),
  option: (provided) => ({
    ...provided,
    color: "var(--color-nav-link)",
    // color: "inherit"
    // backgroundColor: "var(--color-header-even)",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-nav-link)",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
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
