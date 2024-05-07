import { Route, Routes, Navigate } from 'react-router-dom'
import Main from '../layouts/Main'
import CreateUser from './CreateUser'
import LoginUser from './LoginUser'
import Frontpage from './Frontpage'
import Dashboard from './Dashboard'

export default function BuildRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/new" element={<CreateUser />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/frontpage" element={<Frontpage />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route index element={<Navigate to="/frontpage" />} />
                
                {/*<Route path="/category" element={<Content />} />
                <Route path="/category/:category" element={<Content />} />
                <Route path="/*" exact element={<Content />} />*/}
            </Route>
        </Routes>
    )
}