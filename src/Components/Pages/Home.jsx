import React,{useContext, useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Card from "../Card/Card";
import {ItemsContext} from "../Context/Item"
import { fetchFromFirestore } from "../Firebase/Firebase";
import PhoneCard from "../PhoneCard/PhoneCard";
import Footer from "../Footer/Footer";

const Home = () => {
    const [openModal, setModal] = useState(false);
    const [openModalSell, setModalSell] = useState(false);

    function toggleModal() {
        setModal(!openModal);
    }

    function toggleModalSell(){
        setModalSell(!openModalSell);
    }

    const itemsCtx = ItemsContext();

    useEffect(() => {

        const getItems = async () => {
            const datas = await fetchFromFirestore();
            itemsCtx?.setItems(datas);
        }

        getItems();

    },[])

    useEffect(() => {
        console.log("update items : " , itemsCtx?.items);
    },[itemsCtx?.items])

    return (
        <div>
            <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />   
            <Login toggleModal={toggleModal} status={openModal} />
            <Sell setItems={itemsCtx.setItems} toggleModalSell={toggleModalSell} status={openModalSell} />
            <Card items={itemsCtx.items || []} toggleModal={toggleModal} />
            <PhoneCard />
            <Footer />
        </div>
    )
}

export default Home