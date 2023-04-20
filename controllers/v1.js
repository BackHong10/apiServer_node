const jwt = require('jsonwebtoken')
const Domain = require('../models/domain')
const User = require('../models/user')
const Post = require('../models/post')


exports.createToken = async (req,res,next) => {
    const {clientSecret} = req.body

    try {
        const domain = await Domain.findOne({
            where: {
                clientSecret
            },
            include: {
                model: User,
                attributes: ['id', 'nick']
            }
        }) 

        if(!domain){
            res.status(401).json({
                code: 401,
                message: "해당 도메인이 없습니다."
            })
        }

        const token = jwt.sign({
            id: domain.User.id,
            nock: domain.User.nick
        },process.env.JWT_SECRET, {
            expiresIn: '2m'
        })

        return res.json({
            code: 200,
            message: "토큰이 발급되었습니다.",
            token
        })


    } catch (error) {
        console.error(error)
        return res.json({
            code: 500,
            message: "뭔가 에러가 발생했습니다.",
        })
    }

}

exports.testToken = (req,res) => {
    res.json(res.locals.decoded)
}

exports.getMyPosts = async (req,res,next) => {
    
    const user = await User.findOne({
        where: {
            id: res.locals.decoded.id
        },
        include: {
            model: Post,
            attributes: ['content']
        }
    })
    
    const post = await user.getPosts()
    

    res.json({
        code: 200,
        payload : post
    })

}