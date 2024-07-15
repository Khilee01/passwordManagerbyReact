import './index.css'

const PasswordItem = props => {
  const {isPasswordVisible, eachPassword, deleteItemWith} = props
  const {id, websiteName, userName, password} = eachPassword
  const deleteItem = () => {
    deleteItemWith(id)
  }
  return (
    <li className="passItem">
      <p className="initials">{websiteName[0].toUpperCase()}</p>
      <div className="content">
        <p>{websiteName}</p>
        <p>{userName}</p>
        {isPasswordVisible ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button onClick={deleteItem} data-testid="delete" type="button">
        {' '}
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
