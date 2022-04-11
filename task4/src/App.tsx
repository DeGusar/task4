import React from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import { Header } from './Header/Header';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { ControlBar } from './ControlsBar/ControlsBar';
import { columns } from './Table/columns';
import { AppStateType } from './types/types';
import { randomTraderName, randomEmail, randomInt } from '@mui/x-data-grid-generator';

import {
  Snack,
  SnackBan,
  SnackBlocked,
  SnackLoginYes,
  SnackUnban,
  SnackDelete,
} from './Snack/Snack';
import {
  blockUsers,
  deleteUsers,
  genereateUsers,
  getUsers,
  unblockUsers,
} from './services/services';
class App extends React.Component<unknown, AppStateType> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isAuthorised: localStorage.getItem('apiKey') ? true : false,
      showLoginPopUp: false,
      showLogin: true,
      showSignin: false,
      isLoading: false,
      snackSuccessfullRegistration: false,
      snackSuccessfullLogin: false,
      snackBlocked: false,
      snackBan: false,
      snackUnban: false,
      snackDelete: false,
      emailUser: localStorage.getItem('email'),
      users: [],
      selectedIds: [],
    };
  }
  async componentDidMount() {
    const response = await getUsers();
    this.setState({
      users: [...response.data],
    });
  }
  signUpSubmit = () => {
    this.setState({
      showSignin: false,
      showLogin: true,
      snackSuccessfullRegistration: true,
    });
  };
  signInSubmit = async () => {
    try {
      const response = await getUsers();
      this.setState({
        users: [...response.data],
        emailUser: localStorage.getItem('email'),
      });
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 403) {
        this.setState({
          snackBlocked: true,
        });
        return;
      }
    }

    this.setState({
      isAuthorised: true,
      showLoginPopUp: false,
      snackSuccessfullLogin: true,
    });
  };
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
    localStorage.clear();
    this.setState({
      isAuthorised: false,
    });
  };
  handleClickBlock = async () => {
    try {
      await blockUsers(this.state.selectedIds);
      this.setState({
        snackBan: true,
      });
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status == 405) {
        localStorage.clear();
        this.setState({
          isAuthorised: false,
        });
      }
    }

    const usersData = await getUsers();
    this.setState({
      users: [...usersData.data],
    });
  };
  handleClickUnblock = async () => {
    await unblockUsers(this.state.selectedIds);
    this.setState({
      snackUnban: true,
    });
    const usersData = await getUsers();
    this.setState({
      users: [...usersData.data],
    });
  };
  handleClickDelete = async () => {
    try {
      await deleteUsers(this.state.selectedIds);
      this.setState({
        snackDelete: true,
      });
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status == 405) {
        localStorage.clear();
        this.setState({
          isAuthorised: false,
        });
      }
    }
    const usersData = await getUsers();
    this.setState({
      users: [...usersData.data],
    });
  };
  closeSnackBar = () => {
    this.setState({
      snackSuccessfullRegistration: false,
    });
  };
  closeSnackLogin = () => {
    this.setState({
      snackSuccessfullLogin: false,
    });
  };
  closeSnackBlocked = () => {
    this.setState({
      snackBlocked: false,
    });
  };
  closeSnackBan = () => {
    this.setState({
      snackBan: false,
    });
  };
  closeSnackUnban = () => {
    this.setState({
      snackUnban: false,
    });
  };
  closeSnackDelete = () => {
    this.setState({
      snackDelete: false,
    });
  };
  handleClickAdd = () => {
    this.generateUser();
  };
  generateUser = async () => {
    const array = new Array(10).fill({});
    const result = array.reduce((acum) => {
      return acum.concat({
        firstName: randomTraderName().split(' ').splice(0, 1).join(''),
        lastName: randomTraderName().split(' ').splice(1, 1).join(''),
        email: randomEmail(),
        password: randomInt(10000, 1000000),
      });
    }, []);
    await genereateUsers(result);
    const usersData = await getUsers();
    this.setState({
      users: [...usersData.data],
    });
  };
  render() {
    return (
      <div className="App">
        <Header
          isAuthorised={this.state.isAuthorised}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userEmail={`user: ${this.state.emailUser}`}
        />
        {this.state.showLoginPopUp && (
          <>
            {this.state.showLogin && (
              <SignIn
                handleClickLink={this.handleClickToSignIn}
                handleSubmitSignIn={this.signInSubmit}
              />
            )}
            {this.state.showSignin && (
              <SignUp
                handleClickLink={this.handleClickToLogin}
                handleSubmitSignUp={this.signUpSubmit}
              />
            )}
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
                pageSize={10}
                getRowId={(row) => row._id}
                autoHeight={true}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(itm) => {
                  const checked = itm.toString().split(',');
                  this.setState({
                    selectedIds: [...checked],
                  });
                }}
              />
            </div>
          </>
        )}
        <Snack isOpen={this.state.snackSuccessfullRegistration} handleClose={this.closeSnackBar} />
        <SnackBlocked isOpen={this.state.snackBlocked} handleClose={this.closeSnackBlocked} />
        <SnackBan isOpen={this.state.snackBan} handleClose={this.closeSnackBan} />
        <SnackUnban isOpen={this.state.snackUnban} handleClose={this.closeSnackUnban} />
        <SnackDelete isOpen={this.state.snackDelete} handleClose={this.closeSnackDelete} />
        <SnackLoginYes
          isOpen={this.state.snackSuccessfullLogin}
          handleClose={this.closeSnackLogin}
        />
      </div>
    );
  }
}

export default App;
