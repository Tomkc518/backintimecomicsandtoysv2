import Input from "@mui/material/Input";

const SearchFilter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    const searchTerms = event.target.value;
    props.handleSearchFilter(searchTerms);
  };

  return (
    <form noValidate autoComplete="off">
      <Input
        placeholder="Search Title"
        inputProps={{ "aria-label": "description" }}
        color="primary"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleChange(event);
          }
        }}
      />
    </form>
  );
};

export default SearchFilter;
