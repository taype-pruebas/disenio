import express from 'express';
import bodyParser from 'body-parser';
import authController from '../controllers/authController';

const authRouter = express.Router();
const jsonParser = bodyParser.json();

const {createUser} = authController()

authRouter.route('/')
    .get((req, res) => {
        res.status(200).json({message: "olis"});
    })
    .post( jsonParser, async (req, res) => {
        // console.log(req?.body);
        // res.status(200).json({message: "olis"});
        const user = req?.body
        // console.log(user);
        const response = await createUser(user)

        return res.status(response.status_code).json({...response})
    })

export default authRouter