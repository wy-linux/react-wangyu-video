import React, { useState } from 'react';
import LoginComponent from './sign-in';
import RegisterComponent from './register-forget';
import styles from './index.module.css';

export enum LOGIN_COMPONENT_CODE {
    LOGIN = 1,
    FORGET,
    REGISTER,
}

const Login: React.FC = function Login() {
    const [modalContentState, setModalContentState] = useState<LOGIN_COMPONENT_CODE>(LOGIN_COMPONENT_CODE.LOGIN);
    const switchModalContent = (type = LOGIN_COMPONENT_CODE.REGISTER) => {
        setModalContentState(type);
    };
    const renderModalContent = () => {
        if (modalContentState === LOGIN_COMPONENT_CODE.LOGIN) {
            return <LoginComponent onSwitchModalContent={switchModalContent} />;
        }
        if (modalContentState === LOGIN_COMPONENT_CODE.REGISTER || modalContentState === LOGIN_COMPONENT_CODE.FORGET) {
            return (
                <RegisterComponent
                    isRegister={modalContentState === LOGIN_COMPONENT_CODE.REGISTER}
                    onSwitchModalContent={switchModalContent}
                />
            );
        }
    }

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-container']}>
                <div className={styles['right-container']}>{renderModalContent()}</div>
            </div>
        </div>
    );
}

export default Login;
