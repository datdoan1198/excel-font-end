import React, {useState} from "react";
import MainLayout from "@/layouts/User/MainLayout";
import styles from "@/pages/User/Home/styles.module.scss";
import {Button} from "antd";
import {changeExcel} from "@/api/excel.js";

export default function Home() {
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeFile = (val) => {
        setFile(val.target.files[0])
    }

    const handleChangeExcel = () => {
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

    return (
        <MainLayout>
            <div className={styles.homeContainer}>
                <input onChange={handleChangeFile} type="file"/>
                <Button loading={loading} onClick={handleChangeExcel}>Change file</Button>
            </div>
        </MainLayout>
    )
}
