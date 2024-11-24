//  WPAuth is an authentication library for KiwiPress. This is a headless solution to securely authenticate to WordPress to manage plugins
//  and other sensitive data.

class WPAuth {
    static username;
    static password;
    // OAuth 2.0
    static client_id;
    static client_secret;
    static redirect_uri;
    static scope;
    static state;
    static grant_type;
    static code;
    static token;
    static refresh_token;
    static expires_in;

    constructor()
    {
    
    }
    
    app_pass(username, password)
    {
        let headers = new Headers();
        headers.set(
            'Authorization', 'Basic ' + btoa(username + ":" + password)
        );
    }

    oauth()
    {

    }

    setUser(user)
    {
        this.username = user;
    }

    setPass(pass)
    {
        this.password = pass;
    }
}

export default WPAuth;