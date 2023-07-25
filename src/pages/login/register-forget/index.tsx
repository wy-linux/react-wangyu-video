import React, { useState } from 'react';
import { Form, Statistic, Input, Button} from 'antd';
import { registerReq, VerificationCodeReq, resetPasswordReq } from '../../../api/user';
import { LOGIN_COMPONENT_CODE } from '../../../pages/login/index'
import {WrapperPassword} from '../../../pages/login/password'
import VerificationTip from './verify-tip';
import styles from './index.module.css';
const { Item } = Form;
const { Countdown } = Statistic;

export interface RegisterProps {
    onSwitchModalContent: (tab: LOGIN_COMPONENT_CODE) => void;
    isRegister: boolean;
}
interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

const Register: React.FC<RegisterProps> = ({  
    isRegister, 
    onSwitchModalContent 
}) => {
    const verificationCodeLockTime = Date.now() + 1000 * 60;
    const [form] = Form.useForm();
    const [lockFetchCode, setLockFetchCode] = useState<boolean>(false);
    const [verificationPasswordState, setVerificationPasswordState] = useState<boolean>(false);
    const [passwordLengthErrState, setPasswordLengthErrState] = useState<boolean>(false);
    const [passwordUpperLetterErrState, setPasswordUpperLetterErrState] = useState<boolean>(false);
    const [passwordNumberErrState, setPasswordNumberErrState] = useState<boolean>(false);
    const [passwordRequiredErrState, setPasswordRequiredErrState] = useState<boolean>(false);
    const gotoSignIn = () => {
        onSwitchModalContent(LOGIN_COMPONENT_CODE.LOGIN);
    }
    const fetchVerificationCodeHandle = () => {
        if (!form.getFieldValue('email')) {
            form.setFields([
                {
                    name: 'email',
                    errors: ['该字段必传！'],
                },
            ]);
            return;
        }
        setLockFetchCode(true)
        //获取验证码
        VerificationCodeReq(form.getFieldValue('email'))
            .then(() => {})
            .catch(() => {})
    }

    const fieldChangeHandle = (changedFields: FieldData[]) => {
        const fieldName = changedFields[0].name as (number | string)[];
        if (fieldName[0] === 'password') {
            if (form.getFieldValue('password')) {
                setPasswordRequiredErrState(false);
                setVerificationPasswordState(true);
            } else {
                setVerificationPasswordState(false);
            }
        } else if (fieldName[0] === 'code') {
            const codeValue = form.getFieldValue('code');
            form.setFieldsValue({ code: codeValue.replace(/[^\d]/, '') });
        } 
    }

    const onFinish = () => {
        const formValues = form.getFieldsValue();
        if (isRegister) {
            registerReq(formValues)
                .then(() => {
                    setTimeout(() => {
                        onSwitchModalContent(LOGIN_COMPONENT_CODE.LOGIN);
                    }, 1000)
                })
                .catch(() => {})
        } else {
            resetPasswordReq(formValues)
                .then(() => {
                    setTimeout(() => {
                        onSwitchModalContent(LOGIN_COMPONENT_CODE.LOGIN);
                    }, 1000)
                })
                .catch(() => {})
        }
    }
    return (
        <div className={styles['login-form-container']}>
            <div className={styles['register-forget-header']}>
                <h1 className={styles['register-forget-title']}>
                    { isRegister ? '创建一个新账号' : '重置密码' }
                </h1>
                <span className={styles['new-user-tips']}>
                    已经有账号?
                    <span onClick={gotoSignIn} className={styles['interactive-text']}>
                        {' 去登录'}
                    </span>
                </span>
            </div>
            <div className={styles['form-content']}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFieldsChange={fieldChangeHandle}
                    requiredMark={false}
                >
                    <Item
                        name="email"
                        label={<span className={styles['form-label']}>Email</span>}
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
                            () => ({
                                validator(_, value) {
                                    if (/[\u4e00-\u9fa5]+/.test(value)) {
                                        return Promise.reject(new Error('请输入有效的邮箱！'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input className={styles['register-forget-input']} placeholder="example@mail.com" />
                    </Item>
                    <Item
                        name="code"
                        label={<span className={styles['form-label']}>验证码</span>}
                        className={styles['form-item']}
                        rules={[
                            {
                                required: true,
                                message: '该字段必传！',
                            },
                        ]}
                    >
                        <Input 
                            className={styles['register-forget-input']}
                            placeholder="验证码长度为6个数字"
                            maxLength={6}
                            suffix={
                                <Button
                                    disabled={lockFetchCode}
                                    className={styles['verification-code']}
                                    onClick={fetchVerificationCodeHandle}
                                >
                                    获取验证码
                                    {lockFetchCode && (
                                        <Countdown
                                            format="ss"
                                            value={verificationCodeLockTime}
                                            onFinish={() => setLockFetchCode(false)}
                                            key="count-down"
                                            prefix="("
                                            suffix=")"
                                            valueStyle={{ fontSize: '10px', color: '#fff' }}
                                        />
                                    )}
                                </Button>
                            }
                        />
                    </Item>
                    <Item
                        name="password"
                        label={<span className={styles['form-label']}>{isRegister ? 'Password' : 'New Password'}</span>}
                        className={styles['form-item']}
                        validateFirst
                        validateStatus={
                            passwordNumberErrState ||
                            passwordUpperLetterErrState ||
                            passwordLengthErrState ||
                            passwordRequiredErrState
                                ? 'error'
                                : 'success'
                        }
                        rules={[
                            () => ({
                                validator(_, value) {
                                    const passwordLengthError = !(value?.length > 5 && value?.length <= 18);
                                    const passwordUpperError = !/[A-Z]/.test(value);
                                    const passwordNumberError = !/\d+/.test(value);
                                    if (value) {
                                        setPasswordLengthErrState(passwordLengthError);
                                        setPasswordUpperLetterErrState(passwordUpperError);
                                        setPasswordNumberErrState(passwordNumberError);
                                    }
                                    if (
                                        value?.length > 5 &&
                                        value?.length <= 18 &&
                                        /[A-Z]/.test(value) &&
                                        /\d+/.test(value)
                                    ) {
                                        return Promise.resolve();
                                    }
                                    if (!value) {
                                        setPasswordRequiredErrState(true);
                                        return Promise.reject(new Error('该字段必传！'));
                                    }
                                },
                            }),
                        ]}
                    >
                        <WrapperPassword  placeholder="长度为6-18个字符，区分大小写" />
                    </Item>
                    {verificationPasswordState && (
                        <div className={styles['verification-container']}>
                            <VerificationTip errorState={passwordLengthErrState}>
                            6-18个长度
                            </VerificationTip>
                            <VerificationTip errorState={passwordUpperLetterErrState}>
                            至少包含一个大写字符
                            </VerificationTip>
                            <VerificationTip errorState={passwordNumberErrState}>
                            至少包含一个数字
                            </VerificationTip>
                        </div>
                    )}
                    <Item
                        name="confirm-password"
                        label={
                            <span className={styles['form-label']}>
                                {isRegister ? 'Confirm Password' : 'Confirm New Password'}
                            </span>
                        }
                        className={styles['form-item']}
                        validateFirst
                        rules={[
                            {
                                required: true,
                                message: '该字段必传！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value === getFieldValue('password')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <WrapperPassword placeholder="长度为6-18个字符，区分大小写" />
                    </Item>
                    <Item>
                        <Button
                            className={styles['register-forget-btn']}
                            htmlType="submit"
                        >
                            {isRegister ? '注册' : '重置密码'}
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
}
export default Register;
