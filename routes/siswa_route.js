const express = require('express');
const path = require('path');
const ps = require('../prisma/connection');
const upload_profiles = require('../services/foto_profile');
const welcomeMail = require('../services/mailer');

const siswa = express.Router()

siswa.post("/siswa_create",upload_profiles.single("avatar") ,async(req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.siswa.create({
            data : {
                nama_lengkap : data.nama_lengkap,
                kelas : data.kelas,
                email : data.email,
                password : data.password,
                avatar : {
                    create : {
                        filename : file.originalname,
                        image_path : path.join(__dirname, `../uploads/static/profiles/${file.originalname}`)
                    }
                }
            },
            
        })

        if(!result){
            res.json({
                success : false,
                msg : "email sudah terdaftar",
                query : result
            })
        }

        const welcome = await welcomeMail(result.email, result.nama_lengkap)

        res.json({
            success : true,
            msg : "BERHASIL",
            query : result
        })

    } catch (error) {
        res.json({
            success : false,
            msg : "email sudah terdaftar",
        })
    }
})

siswa.get("/siswa_read_all", async(req,res)=>{
    try {
        const result = await ps.siswa.findMany({
            include : {
                avatar : true,
                tugas : true
            }
        })
        res.json({
            success : true,
            // msg : "BERHASIL",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

module.exports = siswa