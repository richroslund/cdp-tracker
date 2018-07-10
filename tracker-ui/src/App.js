import React, { Component } from 'react';
import logo from './makerdao.svg';
import './main.css';
import { Container, Hero, HeroHeader, Navbar, NavbarBrand, NavbarItem, Section } from 'bloomer';
import { CdpTable, EthPrice } from './CdpTable';

class App extends Component {
    constructor() {
        super();
        this.state = {
            cdps: [],
            price: -1
        };
    }
    componentDidMount() {
        this.intervalId = setInterval(() => this.loadData(), 5000);
        this.loadData();
    }
    loadData() {
        return this.getCdps().then(this.getEthPrice());
    }
    getCdps() {
        return fetch(`${process.env.REACT_APP_API_URL}/cdp`)
        .then(res => res.json())
        .then(results => {
            this.setState({...this.state, cdps: results});
        });
    }
    getEthPrice() {
        return fetch(`${process.env.REACT_APP_API_URL}/price/eth`)
                .then(res => res.json())
                .then(results => {
                    if (results && results.price && this.state.price !== results.price) {
                        this.setState({...this.state, price: results.price});
                    }
                });
    }
    render() {
        return (
            <div className="App">
                <Hero isSize='small'>
                    <HeroHeader>
                        <Navbar >
                            <NavbarBrand>
                                <NavbarItem>
                                    <img src={logo} style={{ marginRight: 5 }} /> CDP Tracker
                                </NavbarItem>
                            </NavbarBrand>
                        </Navbar>
                    </HeroHeader>
                </Hero>
                <Section>
                    <Container>
                        <h1 className="App-title">Track some CDPs</h1>
                        <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
                        </p>
                        <EthPrice price={this.state.price} />
                        <CdpTable cdps={this.state.cdps} />
                </Container>
                </Section>
                
                
            </div>
        );
    }
}

export default App;
