const SESSION_TIMEOUT = 10 * 60 * 1000;

export function getSessionUser() {
    if (typeof window !== 'undefined') {
        const session = sessionStorage.getItem('userSession');
        if (!session) return null;
        try {
            const { user, loginTime } = JSON.parse(session);
            const currTime = new Date().getTime();

            if (currTime - loginTime > SESSION_TIMEOUT) {
                sessionStorage.removeItem('userSession');
                return null;
            }
            return user;
        } catch {
            return null;
        }
    }
}
