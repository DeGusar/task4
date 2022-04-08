import React from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

class App extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

export default App;
