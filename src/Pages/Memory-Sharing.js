import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";

import MemorySharingIntro from "../Components/memory-sharing/intro";
import MemoryCardItem from "../Components/memory-sharing/card-item";
import Modal from "../Components/Modal";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import SimplifiedButton from "../Components/SimplifiedButton";
import { useAuth } from "../providers/AuthProvider";
import { getAllSharedMemories, logout } from "../helpers/server";
import ShareMemoryForm from "../Components/memory-sharing/ShareMemoryForm";

export default function MemorySharing() {
	const auth = useAuth();
	const [showModal, setModal] = useState(undefined);
	const [sharedMemoryItems, setSharedMemoryItems] = useState([]);

	useEffect(() => {
		getAllSharedMemories().then(memories => setSharedMemoryItems(memories)).catch();
	}, []);

	useEffect(() => {
		if ((showModal == "signup" || showModal == "login") && auth.isLoggedIn) {
			setModal(undefined);
		}
	}, [showModal, auth.isLoggedIn]);

	const changeModal = (modal) => {
		if ((modal == "signup" || modal == "login") && auth.isLoggedIn) return;
		if (typeof modal == "undefined") {
			setModal(undefined);
		}
		if (modal == "signup" || modal == "login" || modal == "new-post") {
			setModal(modal);
			return
		}
		console.warn("unknown modal", modal);
	}

	const closeModal = changeModal.bind(null, undefined);

	return (
		<>
			{/** @ts-ignore */}
			<Helmet>
				<title>நினைவுகள் மீட்டல் | தமிழ் இலக்கிய மன்றம்</title>
				<meta
					name="description"
					content="தமிழ் இலக்கிய மன்றத்துடனான நினைவுகளை நண்பர்களுடன் பகிர்ந்து கொள்ளுங்கள்"
				/>
				<meta
					name="keywords"
					content="TLA, Tamil Literary Association, Memory Sharing"
				/>
			</Helmet>
			<MemorySharingIntro />
			<Container>
				<Grid justifyContent="space-between" display="flex" alignItems="center" marginTop="1rem">
					<h2 style={{
						fontFamily: "Para",
						margin: "-4px 5px 0 0",
						fontWeight: "400",
						fontSize: "36px"
					}}>
						நினைவுகள்
					</h2>
					{auth.isLoggedIn ?
						<SimplifiedButton title="Add a memory" onClick={changeModal.bind(null, "new-post")}>
							<span className="icon material-symbols-outlined pointable">
								add_circle
							</span>
						</SimplifiedButton>
						: null}

					<div style={{ marginLeft: "auto" }}>
						{auth.isLoggedIn ? <span style={{
							marginRight: 5
						}}>Logged in as {auth.userInfo.name}</span> : null}
						<SimplifiedButton onClick={() => {
							if (!auth.isLoggedIn) {
								changeModal("login")
								return;
							}
							logout().then(auth.loggedOut);
						}}>{auth.isLoggedIn ? `Log Out` : "Login"}</SimplifiedButton>
					</div>

				</Grid>
				<hr style={{
					marginTop: "0px",
					marginBottom: "20px"
				}} />

				{sharedMemoryItems.map(item => {
					return <MemoryCardItem key={item.title} data={item} />
				})}

			</Container>
			<Modal isOpen={showModal == "login"} onClose={closeModal}>
				<Login changeModal={changeModal} />
			</Modal>
			<Modal isOpen={showModal == "signup"} onClose={closeModal}>
				<Signup changeModal={changeModal} />
			</Modal>
			<Modal isOpen={showModal == "new-post"} onClose={closeModal}>
				<ShareMemoryForm closeModal={closeModal} />
			</Modal>
		</>
	);
}
