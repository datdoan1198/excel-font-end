import React, {useState} from "react";
import MainLayout from "@/layouts/User/MainLayout";
import styles from "@/pages/User/Home/styles.module.scss";
import {Button, Upload, message, Row, Col} from "antd";
import {changeExcel} from "@/api/excel.js";
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export default function Home() {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const props = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.xls,.xlsx',
        beforeUpload: (file) => {
            const isExcel = file.type === 'application/vnd.ms-excel' ||
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isExcel) {
                message.error('Only Excel files (.xls, .xlsx) are allowed!');
                return Upload.LIST_IGNORE;
            }
            setFile(file)
            return false;
        },
        onRemove: () => {
            setFile(null);
        }
    };

    const handleChangeExcel = () => {
        if (file) {
            setLoading(true)
            const data = new FormData()
            data.append('file', file)
            changeExcel(data)
                .then((res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'change-excel.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch((error) => {
                    if (error.response?.data) {
                        console.log(error)
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    return (
        <MainLayout>
            <div className={styles.homeContainer}>
                <div className={"w-[45%]"}>
                    <div className={"mb-[20px]"}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                    </div>

                    <div className={"flex justify-end"}>
                        <Button disabled={!file} size={'large'} loading={loading} onClick={handleChangeExcel}>Convert File</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
