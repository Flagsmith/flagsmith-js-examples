import React, { Component } from 'react'
import flagsmith from 'flagsmith'
    
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontSizeEnabled: false,
      fontSize: 10,
      identity: null,
      trait: undefined,
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.identity !== this.state.identity) {
      this.updateFlags()
    }
  }

  updateFlags() {
    try {
      const fontSizeEnabled = flagsmith.hasFeature('font_size');
      const fontSize = flagsmith.getValue('font_size');
      const exampleTrait = flagsmith.getTrait('example_trait');
      this.setState({
        fontSizeEnabled,
        fontSize,
        trait: exampleTrait,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleLogout = async () => {
    await flagsmith.logout()
    this.updateFlags()
    this.setState({ identity: undefined })
  }

  handleIdentify = async () => {
    const identity = await flagsmith.identify('flagsmith_sample_user')
    this.updateFlags()
    this.setState({ identity })
  }

  render() {
    const { fontSizeEnabled, fontSize, trait } = this.state

    return (
      <div>
        <h1>Flagsmith Example</h1>
        <div className='App'>
          <p>Font size enabled: {fontSizeEnabled.toString()} </p>
          <p style={{ fontSize }}>font_size: {fontSize}</p>
          <p>example_trait: {trait}</p>
          <div>
          {trait ? (
            <button onClick={this.handleLogout}>Logout</button>
          ) : (
            <button onClick={this.handleIdentify}>Identify</button>
          )}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
