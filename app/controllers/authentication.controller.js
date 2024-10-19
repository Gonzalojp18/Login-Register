const users = [{
    user: "Harry Potter",
    email: "camaradelossecretos@voldemort.si",
    password: "9314",
}]


async function login(req, res){}

async function register(req, res){
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if(!user || !email || !password){
        res.status(400).send({status: 'error', message: 'campos incompletos'});
    }
    const userReview = users.find(userCheck => userCheck.user === user);
    if(userReview){
        res.status(400).send({status: 'error', message: 'usuario ya existe'})
    }


}


export const methods = {
    login,
    register
}