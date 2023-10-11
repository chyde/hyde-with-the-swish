import {
  alpha,
  AppBar,
  Box,
  InputBase,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useTeamsPlayersProps } from "../utils/TeamsPlayersProvider";
import { useFilters } from "../utils/FiltersProvider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function HeaderAppBar() {
  const teams = useTeamsPlayersProps();
  const { filters, updateFilters } = useFilters();

  const pageTite = teams
    ? Object.keys(teams)
        .map((teamId) => teams[teamId].teamNickname)
        .join(" vs ")
    : "NBA Props";

  const appBarStyle = {
    padding: 2,
    flexDirection: "row",
  };

  return (
    <>
      <AppBar position="fixed" sx={appBarStyle}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          {pageTite}
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(target) => {
              const newSearchTerm = target.target.value;
              updateFilters({ searchString: newSearchTerm });
            }}
          />
        </Search>
      </AppBar>
      <Offset />
    </>
  );
}
