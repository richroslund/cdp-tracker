import React, { Component } from 'react';
import logo from './makerdao.svg';
import './App.css';
import { Container, Hero, HeroBody, Title } from 'bloomer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Hero isColor='info' isSize='medium'>
                    <HeroBody>
                        <Container hasTextAlign='centered'>
                            <Title>CDP Tracker</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
