import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export class CdpTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/cdp`)
    .then(res => res.json())
    .then(results => {
      this.setState({...this.state, data: results});
    });
  }
  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "cupi"
                },
                {
                  Header: "Peth (collateral)",
                  accessor: "ink"
                },
                {
                  Header: "Dai (debt)",
                  accessor: "art"
                },
                {
                  Header: "State",
                  accessor: "state"
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Lad",
                  accessor: "lad"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
