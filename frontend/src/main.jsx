import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"


dayjs.extend(relativeTime)

export default dayjs

createRoot(document.getElementById('root')).render(
    <App />
)
