import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
  },
});

const VirtualizedTable = (props) => {
  const classes = useStyles();

  const cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, rowHeight } = props;
    return (
      <TableCell
        component="div"
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns } = props;

    return (
      <TableCell
        component="div"
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  const { columns, rowHeight, headerHeight, ...tableProps } = props;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight}
          gridStyle={{
            direction: "inherit",
          }}
          headerHeight={headerHeight}
          {...tableProps}
          rowClassName={classes.flexContainer}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
};

const List = ({ data }) => {
  return (
    <Paper style={{ height: "70vh", width: "auto" }}>
      <VirtualizedTable
        rowHeight={48}
        headerHeight={48}
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        columns={[
          {
            width: 100,
            label: "BlockNumber",
            dataKey: "blockNumber",
          },
          {
            width: 100,
            label: "Timestamp",
            dataKey: "timeStamp",
          },
          {
            width: 350,
            label: "From address",
            dataKey: "from",
          },
          {
            width: 350,
            label: "To address",
            dataKey: "to",
          },
          {
            width: 200,
            label: "Value",
            dataKey: "value",
          },
          {
            width: 100,
            label: "Confirmation",
            dataKey: "confirmations",
          },
          {
            width: 350,
            label: "Hash",
            dataKey: "hash",
          },
        ]}
      />
    </Paper>
  );
};

export default List;
