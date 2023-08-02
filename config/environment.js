const development= {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'XAPaH0xKltPTaTXw4GydIXsGR4WAPVhZ',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
        user: 'iamakkaushik',
        pass: 'zoyqdonkicjmgnwo'
    }
    },
    google_client_id: "986797472098-7rqo7iukdl1kaupqtddsree32bbhaooh.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'mJw0UXYcOv6ur2h8iS2fm6fG7fycn94E'
}

const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
        user: process.env.CODEIAL_GMAIL_USERNAME,
        pass: process.env.CODEIAL_GMAIL_PASSWORD
    }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET
}

module.exports= eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);