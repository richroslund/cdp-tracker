import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Container  } from 'bloomer';
import PropTypes from 'prop-types';
import  moment from 'moment';

export class EthPrice extends React.Component {
  render() {
    const { price } = this.props;
    return ( price > 0 && (
      <div><strong>Ethereum:</strong> ${price}
      </div>
    )
    );
  }
}

EthPrice.propTypes = {
  price: PropTypes.number
};

export class CdpTable extends React.Component {
  onClick() {
    fetch(`${process.env.REACT_APP_API_URL}/data/refresh`, {method: 'post'})
  }
  render() {
    const { cdps } = this.props;
    return (
      <div>
        <Container>
          <Button isColor='info' onClick={this.onClick}>Refresh data</Button>
        </Container>
        <ReactTable
          data={cdps}
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
                },
                {
                  Header: "Last Action",
                  accessor: "time",
                  Cell: row => ( <span> {moment(new Date(row.value)).fromNow()} </span>)
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

CdpTable.propTypes = {
  cdps: PropTypes.array
};
