function FindUsername(accounts, username) 
{
    console.log(accounts);

    for (const account of accounts) 
    {
        if (account.username == username) {

            return account._id;
        }
    }

    return -1;
}

function CheckPassword(passwords, password) 
{
    console.log(passwords);

    for (const storedPassword of passwords) 
    {
        if (storedPassword.password == password) 
        {
            return true;
        }
    }
    
    return false;
}

module.exports = { FindUsername, CheckPassword };
