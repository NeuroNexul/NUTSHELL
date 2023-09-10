import style from './style.module.scss'
import { useContext } from 'preact/hooks';
import UIContext from '../../../context/ui-context';
import Logo from "../../../../public/logo.png";
import Match from 'preact-router/match';
import { Link } from 'preact-router';

type Props = {
}

export default function AsideInner({ }: Props) {
    const ui_context = useContext(UIContext);

    return (
        <div className={style.aside_inner}>

            <div className={style.top}>
                <div className={style.top_inner}>
                    <div>
                        <img
                            className={style.logo}
                            src={Logo}
                            alt="Logo"
                        />

                        <div className={style.logo_text}>
                            <span className={style.logo_text_main}>UTSHELL</span>
                            {/* <span className={style.logo_text_sub}>The Companion Tool</span> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.middle}>
                <div className={`${style.middle_inner} custom-scrollbar ${(!ui_context.isSidebarOpen) && style.sidebarclosed}`}>
                    <ul>

                        <Match path='/'>
                            {({ matches }: { matches: boolean }) => (<li>
                                <Link href='/' className={matches ? style.active : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" /></svg>
                                    <span>Dashboard</span>
                                </Link>
                            </li>)}
                        </Match>

                    </ul>
                </div>
            </div>

            <div className={style.bottom}>
                <div className={style.bottom_inner}>
                    <div></div>

                    <button onClick={() => {
                        ui_context.toggleSidebar!();
                    }} style={{
                        height: '100%',
                        aspectRatio: '1/1',
                        transform: ui_context.isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="currentColor"
                        >
                            <path d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293Z" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}