import {
  alpha,
  AppBar,
  InputBase,
  Typography,
  styled,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
          <Grid key={pageTite} item xs={3}>
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
            key={"filters"}
            xs={6}
            boxShadow={1}
            borderRadius={1}
            paddingBottom={1}
            display={"flex"}
            justifyContent={"space-evenly"}
            sx={{ backgroundColor: "white", textAlign: "left" }}
          >
            <FormControl key={"stat-type"}>
              <InputLabel id="select-label-stat-type">Stat Type</InputLabel>
              <Select
                labelId="select-label-stat-type"
                id="select-stat-type"
                value={filters.statTypeId || -1}
                label="Stat Type"
                onChange={(target) => {
                  const newStatTypeId: number = Number(target.target.value);
                  updateFilters({ statTypeId: newStatTypeId });
                }}
              >
                <MenuItem value={-1}>ANY</MenuItem>
                {statTypes.map((statType) => {
                  return (
                    <MenuItem key={statType[1]} value={statType[0]}>
                      {statType[1]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl key={"pos-type"}>
              <InputLabel id="select-label-position">Stat Type</InputLabel>
              <Select
                labelId="select-label-position"
                id="select-position"
                value={filters.position || "ANY"}
                label="Position"
                onChange={(target) => {
                  const position = target.target.value;
                  updateFilters({ position: position });
                }}
              >
                <MenuItem key={"ANY"} value={"ANY"}>
                  ANY
                </MenuItem>
                {positions.map((position) => {
                  return (
                    <MenuItem key={position} value={position}>
                      {position}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl key={"market-status-type"}>
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
                  updateFilters({ marketStatus: marketStatus });
                }}
              >
                <MenuItem key={"ANY"} value={-1}>
                  ANY
                </MenuItem>
                <MenuItem key={"Released"} value={0}>
                  {"Released"}
                </MenuItem>
                ;
                <MenuItem key={"Suspended"} value={1}>
                  {"Suspended"}
                </MenuItem>
                ;
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} key={"search"}>
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
