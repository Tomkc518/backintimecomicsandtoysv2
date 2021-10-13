import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

const TagFilter = (props) => {
  const [tagsState, setTagsState] = useState(props.tags);
  const [checked, setChecked] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChecked = (tag) => {
    const currentIndex = checked.indexOf(tag);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(tag);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    props.handleTagFilters(newChecked);
  };

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const isMatch = useMediaQuery("(max-width:375px)");

  return (
    <>
      {isMatch ? (
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <FormGroup>
              {tagsState.map((tag) => {
                return (
                  <FormControlLabel
                    control={<Checkbox onChange={() => handleChecked(tag)} />}
                    label={tag}
                    key={tag}
                    sx={{ ml: 1 }}
                  />
                );
              })}
            </FormGroup>
          </Drawer>
          <IconButton onClick={() => handleDrawer()} sx={{ mt: 2 }}>
            <FilterAltIcon />
            <Typography>Filter Products</Typography>
          </IconButton>
        </>
      ) : (
        <FormGroup>
          {tagsState.map((tag) => {
            return (
              <FormControlLabel
                control={<Checkbox onChange={() => handleChecked(tag)} />}
                label={tag}
                key={tag}
              />
            );
          })}
        </FormGroup>
      )}
    </>
  );
};

export default TagFilter;
