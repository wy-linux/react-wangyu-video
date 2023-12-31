
### React Hook  + Typescript + Redux 视频点播直播
```shell
1. npm install  下载相关依赖
2. npm run start 启动项目
3. npm run build 打包项目，线上部署
4. 后端接口：https://github.com/wy-linux/react-wangyu-video-server
```
##### 登录--注册改密

```javascript
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
```
##### 获取用户数据之后渲染视图
```JavaScript
const WithRouter: React.FC<IProps> = function ({children}) {
    const { token, email} = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    if(!token) { //没有token直接渲染路由
        return children
    }  else if(!email) { //没有email，请求获取email
        dispatch(getUserAsync())
        return null
    } else { //已经获取用户信息，渲染路由
        return children
    }
}
```