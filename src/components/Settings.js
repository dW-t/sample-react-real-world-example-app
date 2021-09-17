import ListErrors from './ListErrors';

const SettingsForm = () => {
  return (
    <form onSubmit={this.submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={this.state.image}
            onChange={this.updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
            value={this.state.bio}
            onChange={this.updateState('bio')}
          ></textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={this.state.password}
            onChange={this.updateState('password')}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={this.state.inProgress}
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  );
};
const Settings = () => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={this.props.errors}></ListErrors>

            <SettingsForm
              currentUser={this.props.currentUser}
              onSubmitForm={this.props.onSubmitForm}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={this.props.onClickLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
