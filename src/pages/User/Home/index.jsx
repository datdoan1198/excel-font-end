import React from "react";
import MainLayout from "@/layouts/User/MainLayout";
import Handle from './handle.js';
import styles from "@/pages/User/Home/styles.module.scss";

export default function Home() {
    const {} = Handle();

    return (
        <MainLayout>
            <div className={styles.homeContainer}>
                <div>Home Page User</div>
            </div>
        </MainLayout>
    )
}
