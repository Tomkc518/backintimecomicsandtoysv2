import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const TagFilter = (props) => {
  const [tagsState, setTagsState] = useState(
    props.tags
    //   () => {
    //   let listofTags = [];
    //   props.tags.forEach(tag => {
    //     listofTags.push({
    //       label: tag,
    //       checked: false
    //     })
    //   });
    //   return listofTags;
    // }
  );
  const [checked, setChecked] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  // const setupTags = () => {
  //   let listofTags = [];
  //   props.tags.forEach(tag => {
  //     listofTags.push({
  //       label: tag,
  //       checked: false
  //     })
  //   });
  //   setTagsState(listofTags);
  // }

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
    setChecked([]);
    props.handleTagFilters([]);
  };

  const isMatch = useMediaQuery("(max-width:375px)");

  return (
    <>
      {isMatch ? (
        <>
          <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
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
          </Drawer>
          <IconButton onClick={() => handleDrawer()}>
            <MenuIcon color="success" />
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
