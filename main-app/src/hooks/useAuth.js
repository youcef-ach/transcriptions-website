export const isAuthenticated = () => {
    if (localStorage.getItem('access-token')) return true
    else if (localStorage.getItem('refresh-token')) {
        
    }
    else return false
}