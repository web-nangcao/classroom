import Head from "next/head";
import Image from "next/image";

import styles from "../../styles/Home.module.css";

import Layout from "../../components/layout";

import TopBar from "../../components/topbar/topBar";
import MenuBar from "../../components/menuBar/menubar";
import ClassRoom from "../../components/classroom/classroom";

export default function ClassRoomPage() {
  return (
    <Layout>
      <>
        <div className={styles.container}>
          <Head>
            <title>Account Profile</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <TopBar></TopBar>
          <p>Account Profile</p>
          <ClassRoom></ClassRoom>
        </div>
      </>
    </Layout>
  );
}
