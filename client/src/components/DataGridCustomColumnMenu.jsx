import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, colDef, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      colDef={colDef}
      open={open}
    >
      <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
      <GridColumnMenuHideItem onClick={hideMenu} colDef={colDef} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;


// GridColumnMenuHideItem
// GridColumnMenuFilterItem

// GridFilterMenuItem
// HideGridColMenuItem