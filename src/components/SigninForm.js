import React from 'react';
import styles from './SigninForm.less';
import { Link } from 'dva/router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class SigninForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入邮箱或手机号码！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入邮箱地址或手机号码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入登录密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入登录密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>下次自动登录</Checkbox>
          )}
          <Link to='/forgot' className={styles.forgot}>忘记密码</Link>
          <Button type="primary" htmlType="submit" className={styles.login}>
            登录
          </Button>
          <h3><Link to="/signup">新用户注册</Link></h3>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SigninForm);
