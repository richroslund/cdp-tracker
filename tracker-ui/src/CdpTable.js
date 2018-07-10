import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Container  } from 'bloomer';

export class EthPrice extends React.Component {
  constructor() {
    super();
    this.state = {
      price: "NULL"
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 5000);
    this.loadData();
  }
  loadData() {
    fetch(`${process.env.REACT_APP_API_URL}/price/eth`)
    .then(res => res.json())
    .then(results => {
      if (results && results.price && this.state.price !== results.price) {
        this.setState({...this.state, price: results.price});
      }
      
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
    this.intervalId = setInterval(() => this.loadData(), 5000);
    this.loadData();
  }
  loadData() {
    return fetch(`${process.env.REACT_APP_API_URL}/cdp`)
    .then(res => res.json())
    .then(results => {
      this.setState({...this.state, data: results});
    });
  }
  onClick() {
    fetch(`${process.env.REACT_APP_API_URL}/data/refresh`, {method: 'post'})
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Container>
          <Button isColor='info' onClick={this.onClick}>Refresh data</Button>
        </Container>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "Id",
                  accessor: "cupi", 
                  Cell: row => ( <a href={`https://mkr.tools/cdp/${row.value}`}>{row.value}</a>)
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
                  Header: "Liquidation price",
                  accessor: 'liquidation'
                },
                {
                  Header: "Owner",
                  accessor: "owner",
                  Cell: row => ( <a href={`https://etherscan.io/address/${row.value}`}> {row.value} </a> )
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
