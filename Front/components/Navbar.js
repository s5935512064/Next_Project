import Head from 'next/head'
import Link from 'next/link'

const NavBar = () => {

    return(
        <nav className="navbar fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    PSU Care Covid-19</a>
                    <div className="p-s">
                        <Link href="/book">
                        <button className="btn btn-outline-light me-3">Home</button>
                        </Link>              
                    </div>
            </div>
            </nav>
            
    )
}

export default NavBar