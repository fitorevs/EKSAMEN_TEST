import { Route, Routes, Navigate } from 'react-router-dom'
import Main from '../layouts/Main'
import CreateUser from './CreateUser'
import LoginUser from './LoginUser'

export default function BuildRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/new" element={<CreateUser />} />
                <Route path="/login" element={<LoginUser />} />

                {/*<Route index element={<Navigate to="/category" />} />
                <Route path="/category" element={<Content />} />
                <Route path="/category/:category" element={<Content />} />
                <Route path="/*" exact element={<Content />} />*/}
            </Route>
        </Routes>
    )
}