
import {Timestamp} from "./firebase"
export const getTimeAgo = (timestamp: Timestamp) => {
    
    const date = timestamp.toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} years ago`;
    } else if (months > 0) {
        return `${months} months ago`;
    } else if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 24) {
        return `${Math.floor(hours / 24)} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}


export const showMessage = (message: string , backcolor : string) => {

    const div = document.createElement("div");
    div.classList.add("message");
    div.style.backgroundColor = backcolor;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 3000);

}


export const hashString = (str: string) => {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash;
}