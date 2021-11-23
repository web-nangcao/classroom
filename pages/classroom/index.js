import Head from "next/head";
import Image from "next/image";

import Grid from "@mui/material/Grid";

import styles from "../../styles/Home.module.css";

import Layout from "../../components/layout";

import TopBar from "../../components/topbar/topBar";
import MenuBar from "../../components/menuBar/menubar";
import ClassRoom from "../../components/classroom/classroom";

import libClassroom from "../../lib/classroom";

import Session from "../../lib/useSession";

export async function getStaticProps() {
  const listClass = libClassroom;
  return {
    props: {
      listClass,
    },
  };
}

export default function ClassRoomPage({ listClass }) {
  const count = 2;
  return (
    <Layout>
      <>
        <div className={styles.container}>
          <Head>
            <title>Class List</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <TopBar></TopBar>
          <MenuBar></MenuBar>
          <Grid container>
            {listClass.map((classRoom) => {
              return (
                <Grid item xs={3}>
                  <ClassRoom classroom={classRoom}></ClassRoom>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </>
    </Layout>
  );
}
