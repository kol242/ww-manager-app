import React from 'react'
import { Link } from 'react-router-dom'

import '../Common/style/home.scss'
import Image from '../Common/images/home-image.png'

function Home() {
    return (
        <div className="main-container">
            <div>

            </div>
            <div className="home-wrapper">
                <div>
                    <h1>Dobrodošli!</h1>
                    <p>Jednostavna aplikacija u kojoj se može dodavati, brisati, uređivati i čitati podatke o radnicima i radnim mjestima unutar fiktivne tvrtke.</p>
                    <p>Aplikaciju izradio: <span>Valentino Kolinger</span></p>
                </div>
                <div>
                    <p>Odaberite listu:</p>
                    <Link to="/workplaces"><button className="btn-list-select">Radna mjesta</button></Link>
                </div>
                <div>
                    <Link to="/workers"><button className="btn-list-select">Lista radnika</button></Link>
                </div>
                <div>
                    <img src={Image} alt="homeImage" />
                </div>
            </div> 
            <div>
                </div>  
        </div>
    )
}

export default Home
