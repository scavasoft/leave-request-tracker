exports.DB_DIR = '../leaves.db';

exports.TYPE = [
    {NAME: 'Vacation'},
    {NAME: 'Sick day'},
    {NAME: 'Weeding'},
    {NAME: 'Dead'},
]

//user role types
exports.ROLE = [
    {ROLE: 'admin'},
    {ROLE: 'user'},
    {ROLE: 'supervisor'}
]


//token expire time
exports.EXPIRES_IN = {
    expiresIn: '24h'
}

//token secret key
exports.SECRET_TOKEN = 'mySecretKey';