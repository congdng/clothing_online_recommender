import bcrypt from 'bcryptjs';


const users = [
    {
        name: 'John',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'ABD',
        email: 'abd@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'asf',
        email: 'asf@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users