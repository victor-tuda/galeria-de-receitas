import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const sigIn = async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email})
        
        if(!existingUser) return res.status(404).json({message:"Usuário não existe"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(404).json({message: "Credenciais inválidas"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({message: "Algo deu errado"});
    }
}

export const sigUp = async(req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({message:"Usuário já existe"});

        if(password !== confirmPassword) return res.status(400).json({message:"Senhas não coincidem"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: existingUser._id}, 'test', { expiresIn: "1h"})

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({message: "Algo deu errado"});
    }

    
}