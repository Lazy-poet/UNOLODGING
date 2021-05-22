import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../store/AuthContext';
import { RoomData } from '../../store/AuthContext'
import ListItem from "../RoomsList/ListItem";
import styles from "../RoomsList/RoomsList.module.css";
import { Button } from "react-bootstrap";
import axios from "axios"
interface Props {

}

const Listings = (props: Props) => {
    const [listings, setListings] = useState([] as RoomData[])
    const ctx = useContext(AuthContext);

    useEffect(() => {
        const list = ctx.roomsData.filter(room => room.hostid === ctx.userData.email);
        setListings(list)
    }, [ctx.roomsData, ctx.userData.email]);

    const deleteRoom = async (id) => {
        try {
            const res = await axios.delete(`https://fierce-plains-40745.herokuapp.com/api/delete/${id}`);
            return res.data.status
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={styles.Wrapper}>
            <h3 style={{ "fontWeight": 700, "padding": "20px 0" }}>Your Listings</h3>
            {listings.length === 0 ? <>
                <h4 style={{ "textAlign": "center" }}>A list of apartments you have hosted will appear here. List is currently empty</h4>
                <Button>Start Hosting</Button>
            </> : listings.map(room => room && <ListItem deleteHandler={deleteRoom} delete={true} favClick={ctx.handleFavorites} click={ctx.handleRoomClick} favorites={ctx.favorites} room={room} />)}
        </div>
    )
}

export default Listings
