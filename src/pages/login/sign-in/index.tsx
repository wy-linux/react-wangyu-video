import React  from 'react';
import { useNavigate  } from 'react-router-dom'
import { Form } from 'antd';
import { useAppDispatch } from '../../../store/hook'
import { loginAsync } from '../../../store/slicers/userSlice'
import { Button, Input} from 'antd'
import { WrapperPassword } from '../password'
import { LOGIN_COMPONENT_CODE } from '..'
import styles from './index.module.css';
const { Item } = Form;
interface LoginProps {
    onSwitchModalContent: (tab: LOGIN_COMPONENT_CODE) => void;
}
const Login: React.FC<LoginProps> = ({ 
    onSwitchModalContent, 
}) => {
        const dispatch = useAppDispatch()
        const [form] = Form.useForm();
        const navigate = useNavigate ()
        const gotoNewAccount = () => {
            onSwitchModalContent(LOGIN_COMPONENT_CODE.REGISTER);
        }
        const gotoForget =() => {
            onSwitchModalContent(LOGIN_COMPONENT_CODE.FORGET);
        }
        const onFormFinish =  () => {
            const formValues = form.getFieldsValue();
            dispatch(loginAsync(formValues))
                .then(() => {
                    navigate('/profile')
                })
        }
        return (
            <div className={styles['login-form-container']}>
                <div className={styles['login-header']}>
                    <h1 className={styles['login-header-title']}>登录</h1>
                    <span className={styles['new-user-tips']}>
                        {'还没有账号?  '}
                        <span onClick={gotoNewAccount} style={{ color: '#004AE6', cursor: 'pointer' }}>
                        创建一个新账号
                        </span>
                    </span>
                </div>
                <div className={styles['form-content']}>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFormFinish}
                        requiredMark={false}
                    >
                        <Item
                            name="email"
                            label={<span className={styles['login-label']}>邮箱</span>}
                            className={styles['form-item']}
                            validateFirst
                            rules={[
                                {
                                    required: true,
                                    message: '该字段必传！',
                                },
                                {
                                    type: 'email',
                                    message: '该邮箱无效！',
                                },
                            ]}
                        >
                            <Input className={styles['login-input']} placeholder="example@mail.com" />
                        </Item>
                        <Item>
                            <Item
                                name="password"
                                label={<span className={styles['login-label']}>密码</span>}
                                className={styles['form-item']}
                                validateFirst
                                rules={[
                                    {
                                        required: true,
                                        message: '该字段必传！',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (value.length > 5 && value.length < 19) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('密码长度为6-18个字符！'));
                                        },
                                    }),
                                ]}
                            >
                                <WrapperPassword placeholder="长度为6-18个字符，区分大小写"/>
                            </Item>
                            <a className={styles['forget-btn']} onClick={gotoForget}>
                               重置密码?
                            </a>
                        </Item>
                        <Item>
                            <Button
                                htmlType="submit"
                                className={styles['login-btn']}
                            >
                               登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        );
}
export default Login;
