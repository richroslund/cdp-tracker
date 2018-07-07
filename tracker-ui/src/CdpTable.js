import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export class EthPrice extends React.Component {
  constructor() {
    super();
    this.state = {
      price: "NULL"
    };
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/price/eth`)
    .then(res => res.json())
    .then(results => {
      this.setState({...this.state, price: results.price});
    });
  }
  render() {
    const { price } = this.state;
    return (
      <div><strong>Ethereum:</strong> ${price}
      </div>
    );
  }
}

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
                  Header: "Owner",
                  accessor: "owner"
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
