import {
  alpha,
  AppBar,
  Box,
  InputBase,
  TextField,
  Toolbar,
  Typography,
  styled,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
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

const selectStyles = {
  // height: "2.5rem",
  color: "white",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
};

export default function HeaderAppBar() {
  const {
    teamsPlayersProps: teams,
    statTypes,
    positions,
  } = useTeamsPlayersProps();
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
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "left" }}
            >
              {pageTite}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            boxShadow={1}
            borderRadius={1}
            paddingBottom={1}
            sx={{ backgroundColor: "white", textAlign: "left" }}
          >
            <FormControl>
              <InputLabel id="select-label-stat-type">Stat Type</InputLabel>
              <Select
                labelId="select-label-stat-type"
                id="select-stat-type"
                value={filters.statTypeId || -1}
                label="Stat Type"
                onChange={(target) => {
                  const newStatTypeId: number = Number(target.target.value);
                  console.log(newStatTypeId);
                  updateFilters({ statTypeId: newStatTypeId });
                }}
              >
                <MenuItem value={-1}>ANY</MenuItem>
                {statTypes.map((statType) => {
                  return <MenuItem value={statType[0]}>{statType[1]}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-label-position">Stat Type</InputLabel>
              <Select
                labelId="select-label-position"
                id="select-position"
                value={filters.position || "ANY"}
                label="Position"
                onChange={(target) => {
                  const position = target.target.value;
                  console.log(position);
                  updateFilters({ position: position });
                }}
              >
                <MenuItem value={"ANY"}>ANY</MenuItem>
                {positions.map((position) => {
                  return <MenuItem value={position}>{position}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-label-market-status">
                Market status
              </InputLabel>
              <Select
                labelId="select-label-market-status"
                id="select-market-status"
                value={
                  filters.marketStatus === undefined ? -1 : filters.marketStatus
                }
                label="Market status"
                onChange={(target) => {
                  const marketStatus = Number(target.target.value);
                  console.log(marketStatus, filters);
                  updateFilters({ marketStatus: marketStatus });
                }}
              >
                <MenuItem value={-1}>ANY</MenuItem>
                <MenuItem value={0}>{"Released"}</MenuItem>;
                <MenuItem value={1}>{"Suspended"}</MenuItem>;
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Search sx={{ flexGrow: 2 }}>
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
          </Grid>
        </Grid>
      </AppBar>
      <Offset />
    </>
  );
}
