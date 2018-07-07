import React, { Component } from 'react';
import logo from './makerdao.svg';
import './main.css';
import { Container, Hero, HeroHeader, Navbar, NavbarBrand, NavbarItem, Section } from 'bloomer';
import { CdpTable } from './CdpTable';

class App extends Component {
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
                        <CdpTable />
                </Container>
                </Section>
                
                
            </div>
        );
    }
}

export default App;
