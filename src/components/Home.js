import { 
    signOut,
   } from "firebase/auth";


function Home(props) {
    //props.auth

    const userLogOut = async () => {
        await signOut(props.auth);
    }


    return (
        <div className="home-page">
            <p>Home Page</p>
            <button onClick={userLogOut}>Log Out</button>
        </div>
    );
}

export default Home;