import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { videoCreate } from '../../api/video'
import styles from './index.module.css'

interface IValues {
    url: string;
    name: string;
}
interface CollectionFormProps {
    open: boolean;
    onCreate: (values: IValues) => void;
    onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            cancelText="取消"
            onCancel={onCancel}
            okText="爬取"
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('校验失败:', info);
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <div className={styles['title']}>
                    目前仅支持<a href='https://www.bilibili.com/' target="_blank">哔哩哔哩视频链接</a>爬取
                </div>
                <Form.Item
                    name="url"
                    label={`请输入要爬取的哔哩哔哩视频链接：`}
                    rules={[{ required: true, message: `请输入要爬取的哔哩哔哩视频链接!`}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label={`请输入爬取后的视频名称：`}
                    rules={[{ required: true, message: `请输入爬取后的视频名称!`}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const Create: React.FC = function () {
    const [open, setOpen] = useState(false)
    const onCreate = async ({url, name}: IValues) => {
        setOpen(false);
        message.info('爬取中，请稍后！')
        videoCreate(url, name)
            .then(() => {
                window.location.reload()
            })
            .catch(() => {})
    }
    return (
        <div className={styles['video-create-box']}>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                新增视频 +
            </Button>
            <Button
                type="primary"
                onClick={() => {
                   message.info('开发中......') 
                }}
            >
                新建直播 +
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                  setOpen(false);
                }}
            />
        </div>
    )
}
export default Create