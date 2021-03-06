import StyleSheet from 'react-style';
import React from 'react';

import {User} from '../models/Models';
import CardFormMixin from './CardFormMixin';

let UserResetPasswordCard = React.createClass({
  mixins: [CardFormMixin],

  getInitialState() {
    return {
      formValids: {
        'email': true,
      },
    };
  },

  componentDidUpdate() {
    componentHandler.upgradeDom();
  },

  render() {
    const {reqResult} = this.state;
    return (
      <div className="mdl-card mdl-shadow--2dp" styles={[this.styles.card, this.props.style]}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">重置密码</h2>
        </div>
        { this.renderResult() }
        {
          reqResult.fin && reqResult.ok ? null :
            this.renderForm(this.onReset, [
              this.renderInput("email", "Email*(仅限公司 Email 地址)", { type: "email" }), 
            ])
        }
        { this.renderAction("重置密码", this.onReset) }
      </div>
    );
  },

  onReset() {
    const {isValid, formData} = this.validateForm(["email"], ["email"]);
    if (isValid) {
      this.setState({ inRequest: true });
      User.resetPasswordByEmail(formData, this.onRequestCallback);
    }
  },

});

export default UserResetPasswordCard;
