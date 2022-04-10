import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import { Header } from './Header/Header';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { ControlBar } from './ControlsBar/ControlsBar';
import { columns } from './Table/Table';
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { UsersType } from './Table/Table';

type AppStateType = {
  isAuthorised: boolean;
  showLoginPopUp: boolean;
  showLogin: boolean;
  showSignin: boolean;
  isLoading: boolean;
  users: UsersType[];
};
class App extends React.Component<unknown, AppStateType> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isAuthorised: true,
      showLoginPopUp: false,
      showLogin: true,
      showSignin: false,
      isLoading: false,
      users: [],
    };
  }
  componentDidMount() {
    this.generateUser();
  }
  handleClickToSignIn = () => {
    this.setState({
      showSignin: true,
      showLogin: false,
    });
  };
  handleClickToLogin = () => {
    this.setState({
      showSignin: false,
      showLogin: true,
    });
  };
  handleLogin = () => {
    this.setState({
      showLoginPopUp: true,
    });
  };
  handleLogout = () => {
    this.setState({
      isAuthorised: false,
    });
  };
  handleClickBlock = () => {
    console.log('Block');
  };
  handleClickUnblock = () => {
    console.log('UnBlock');
  };
  handleClickDelete = () => {
    console.log('Delete');
  };
  handleClickAdd = () => {
    this.generateUser();
  };
  generateUser = () => {
    const array = new Array(10).fill({});
    const result = array.reduce((acum) => {
      return acum.concat({
        id: uuidv4(),
        firstName: randomTraderName().split(' ').splice(0, 1).join(''),
        lastName: randomTraderName().split(' ').splice(1, 1).join(''),
        email: randomEmail(),
        age: Math.floor(Math.random() * 80),
        registration: randomCreatedDate(),
        lastVisit: randomUpdatedDate(),
        status: 'Active',
      });
    }, []);
    this.setState({
      users: [...this.state.users, ...result],
    });
    console.log(JSON.stringify(this.state.users));
  };
  render() {
    return (
      <div className="App">
        <Header
          isAuthorised={this.state.isAuthorised}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        {this.state.showLoginPopUp && (
          <>
            {this.state.showLogin && <SignIn handleClickLink={this.handleClickToSignIn} />}
            {this.state.showSignin && <SignUp handleClickLink={this.handleClickToLogin} />}
          </>
        )}
        {this.state.isAuthorised && (
          <>
            <ControlBar
              handleClickBlock={this.handleClickBlock}
              handleClickUnblock={this.handleClickUnblock}
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
            />
            <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={this.state.users}
                columns={columns}
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                loading={this.state.isLoading}
                pageSize={40}
                autoHeight={true}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(itm) => {
                  const checked = itm.toString().split(',');
                  this.state.users.filter((item) => checked.includes(item.id.toString()));
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
