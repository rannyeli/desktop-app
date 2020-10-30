import { useState } from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchTransactions, isAddressValid } from "../actions";
import { useNotifications } from "../providers/NotificationsProvider";

const useStyles = makeStyles({
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const Search = ({ setTransactions }) => {
  const [address, setAddress] = useState();
  const setNotification = useNotifications()[1];
  const classes = useStyles();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!isAddressValid(address)) setNotification("Invalid address");
    else {
      try {
        const response = await fetchTransactions(address);
        setTransactions(response.data.result);
      } catch (err) {
        setNotification("Fetch transactions failed");
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={classes.searchBar}>
      <FormControl>
        <TextField
          label="Address"
          size="small"
          variant="outlined"
          onChange={(event) => setAddress(event.target.value)}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="secondary">
        search
      </Button>
    </form>
  );
};

export default Search;
