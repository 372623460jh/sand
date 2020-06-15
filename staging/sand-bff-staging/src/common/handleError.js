import login from '@/components/loginModel';
import { message } from 'antd';

/**
 * 接口异常处理方法
 * @param {*} res 接口返回
 */
export default function handleError(res) {
  const { data } = res;
  const { stat, errorCode, errorMsg } = data;
  if (stat === 'faild' && errorCode === 'L0005') {
    message.error(errorMsg);
    // 未登录，调用登录组件
    login();
  }
  return res;
}
