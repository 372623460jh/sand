import { Modal, Input, Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from '@jianghe/sand-core/react';
import PropTypes from '@jianghe/sand-core/prop-types';
import { encryptLoginInfo } from '@/common/utils/cert';
import { post } from '@/common/fetch';

import styles from './index.module.less';

/**
 * 登录组件
 */
function Login(props) {
  const [form] = Form.useForm();

  const { getFormInstance } = props;

  /**
   * 将form实例传出
   */
  getFormInstance(form);

  return (
    <Form
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 19,
      }}
      form={form}
    >
      <Form.Item
        label="用户名"
        name="userName"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item
        label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input.Password
          placeholder="密码"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
    </Form>
  );
}

Login.propTypes = {
  getFormInstance: PropTypes.func.isRequired,
};

/**
 * 唤起登录的api
 */
function login() {
  let formInstance = null;

  /**
   * 获取form实例方法
   * @param {*} form
   */
  const getFormInstance = (form) => {
    formInstance = form;
  };

  /**
   * 登录方法
   */
  const loginFn = async () => {
    if (!formInstance) {
      return Promise.reject();
    }

    try {
      /**
       * 读取登录信息
       */
      const {
        password = '',
        userName = '',
      } = await formInstance.validateFields();

      /**
       * 加密登录信息
       */
      const encryptStr = encryptLoginInfo(
        {
          accountName: userName,
          password,
        },
        // eslint-disable-next-line no-underscore-dangle
        window.__public_key__
      );

      /**
       * 调用登录接口
       */
      const { data } = await post('/login.json', { info: encryptStr });
      const { stat, errorMsg } = data;
      if (stat === 'ok') {
        // 登录成功
        message.success('登录成功');
        return Promise.resolve();
      }
      // 登录失败
      message.error(errorMsg);
      return Promise.reject();
    } catch (error) {
      return Promise.reject();
    }
  };

  const modal = Modal.confirm({
    className: styles.loginBox,
    destroyOnClose: true,
    icon: null,
    title: null,
    maskClosable: false,
    content: <Login getFormInstance={getFormInstance} />,
    okText: '登录',
    cancelText: '取消',
    width: 400,
    onOk: loginFn,
    onCancel: () => {
      modal.destroy();
    },
  });

  return modal;
}

export default login;
