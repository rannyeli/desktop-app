import { useState } from "react";
import { AppBar, Toolbar, Typography, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "./List";
import Search from "./Search";
import { NotificationsProvider } from "../providers/NotificationsProvider";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState("");
  const classes = useStyles();

  return (
    <NotificationsProvider value={[notification, setNotification]}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Desktop App
          </Typography>
        </Toolbar>
      </AppBar>
      <Search setTransactions={setTransactions} />
      <List data={transactions} />
      <Snackbar
        open={notification.length}
        autoHideDuration={4000}
        onClose={() => setNotification("")}
        message={notification}
      />
    </NotificationsProvider>
  );
};

export default App;
