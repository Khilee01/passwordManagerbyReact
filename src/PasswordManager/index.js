import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    numberOfPassword: 0,
    PasswordsList: [],
    websiteName: '',
    userName: '',
    password: '',
    isPasswordVisible: false,
    searchInput: '', // Add state variable for search input
  }

  add = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const passwordCard = {
      id: uuidv4(),
      websiteName,
      userName,
      password,
    }
    this.setState(prevState => ({
      PasswordsList: [...prevState.PasswordsList, passwordCard],
      numberOfPassword: prevState.numberOfPassword + 1,
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  handleWebsiteNameChange = event => {
    this.setState({websiteName: event.target.value})
  }

  handleUserNameChange = event => {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  deleteItemWith = id => {
    this.setState(prevState => ({
      PasswordsList: prevState.PasswordsList.filter(
        eachPasswordItem => eachPasswordItem.id !== id,
      ),
      numberOfPassword: prevState.numberOfPassword - 1,
    }))
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  filterListOnSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      numberOfPassword,
      isPasswordVisible,
      PasswordsList,
      websiteName,
      userName,
      password,
      searchInput,
    } = this.state

    const filteredPasswords = PasswordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="mainContainer">
        <div className="mainInnerContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="appLogo"
          />
          <div className="con1">
            <form className="addPasswordForm" onSubmit={this.add}>
              <h1>Add New Password</h1>
              <div className="inputTags">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  placeholder="Enter Website"
                  id="website"
                  type="text"
                  value={websiteName}
                  onChange={this.handleWebsiteNameChange}
                />
              </div>
              <div className="inputTags">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  placeholder="Enter Username"
                  id="username"
                  type="text"
                  value={userName}
                  onChange={this.handleUserNameChange}
                />
              </div>
              <div className="inputTags">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  placeholder="Enter Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={this.handlePasswordChange}
                />
              </div>
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="imagePasswordManager"
              alt="password manager"
            />
          </div>
          <div className="con2">
            <div className="headerCon2">
              <div className="yourPasswords">
                <h1>Your Passwords</h1>
                <p>{numberOfPassword}</p>
              </div>
              <div className="searchContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.filterListOnSearch}
                  value={searchInput} // Ensure the input reflects the state
                />
              </div>
            </div>
            <hr />
            <div className="showPasswords">
              <input
                type="checkbox"
                id="showPassword"
                name="showPassword"
                onChange={this.toggleShowPassword}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>
            {filteredPasswords.length > 0 ? (
              <ul>
                {filteredPasswords.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    eachPassword={eachPassword}
                    isPasswordVisible={isPasswordVisible}
                    deleteItemWith={this.deleteItemWith}
                  />
                ))}
              </ul>
            ) : (
              <div className="imgPassword">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
